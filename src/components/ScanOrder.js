import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import StatusDataService from "../services/StatusService";

const ScanOrder = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    order_status_id: "",

    status: {
      description: "",
      id: "",
      sequence_num: "",
      status_federal_office_code: "",
      active_status: "",
      status_code: "",
    },
  };

  const initialMessageState = {
    success: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState(initialMessageState);
  const [statuses, setStatuses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [popUpBox, setPopUpbox] = useState("none");
  const loginError = "You must be logged in to view this page";

  const getOrder = (id) => {
    OrderDataService.get(id)
      .then((response) => {
        setOrder(response.data);
        console.log("Get Resp: ", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  const retrieveStatuses = () => {
    StatusDataService.getStatus()
      .then((response) => {
        setStatuses(response.data.statuses);
        console.log(response.data.statuses);
      })
      .catch((e) => {
        console.log("Status Error");
        console.log(e);
        if (e.response?.status === 401) {
          setErrorMessage(loginError);
        } else {
          setPopUpbox("block");
          setErrorMessage(
            e.message +
              "." +
              "Check with admin if server is down or try logging out and logging in."
          );
        }
      });
  };

  useEffect(() => {
    if (statuses.length === 0) {
      retrieveStatuses();
    }
  }, [statuses]);

  const dynamicSort = (property) => {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  let nextDesc = "";
  let nextId = null;
  let nextSeq = null;
  let nextStatusFedOfficeCode = "";

  if (statuses && order) {
    statuses.sort(dynamicSort("sequence_num"));

    const currentSeq = order.status.sequence_num;

    for (let i = 0; i < statuses.length - 1; i++) {
      if (statuses[i].sequence_num > currentSeq) {
        nextDesc = statuses[i].description;
        nextId = statuses[i].id;
        nextSeq = statuses[i].sequence_num;
        nextStatusFedOfficeCode = statuses[i].status_federal_office_code;
        break;
      }
      /*
      if (i === statuses.length - 2) {
        nextDesc = "FINAL";
      }
      */
    }
  }

  const handleUpdate = () => {
    const upOrder = {
      ...order,
      order_status_id: nextId,
      status: {
        description: nextDesc,
        id: nextId,
        sequence_num: nextSeq,
        status_federal_office_code: nextStatusFedOfficeCode,
      },
    };
    return upOrder;
  };

  const updateOrder = (upOrder) => {
    OrderDataService.update(upOrder.uuid, upOrder)
      .then((response) => {
        setOrder(response.data);
        console.log("Update Resp: ", response.data);
        setMessage({
          ...message,
          success: "The order was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveUpdate = () => {
    const upOrder = handleUpdate();
    updateOrder(upOrder);
  };

  const cancelOrder = () => {
    console.log("Order Canceled");
  };

  const closePopUpBox = () => {
    setPopUpbox("none");
  };

  return (
    <div>
      {order ? (
        <>
          <div className="form-group">
            <label htmlFor="order_number">
              Order Number: <strong>{order.order_number}</strong>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="usa_state">
              US State: <strong>{order.usa_state}</strong>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="home_office_code">
              Congressional Office: <strong>{order.home_office_code}</strong>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="current_status">
              Current Status:{" "}
              {order.status.description ? (
                <strong>
                  #{order.status.sequence_num} - {order.status.description}
                </strong>
              ) : (
                <strong>Missing status...</strong>
              )}
            </label>
          </div>
          {order.status.active_status === "CLOSED" ? (
            <div className="form-group">
              <label htmlFor="next_status">
                <strong>Order Complete</strong>
              </label>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="next_status">
                  Next Status:{" "}
                  {statuses && order.status.description ? (
                    <strong>
                      #{nextSeq} - {nextDesc}
                    </strong>
                  ) : (
                    <strong>Missing data needed to generate next Status</strong>
                  )}
                </label>
              </div>
              <button onClick={saveUpdate} className="btn btn-success">
                {"Update Status"}
              </button>{" "}
            </>
          )}
          <button onClick={cancelOrder} className="btn btn-success">
            {"Cancel Order"}
          </button>
          <p>{message.success}</p>
        </>
      ) : (
        <div>
          <br />
          <p>Please click on an order...</p>
        </div>
      )}
      <div className="pop-container" style={{ display: popUpBox }}>
        <div className="pop-up" onClick={closePopUpBox}>
          <h3>{errorMessage}</h3>
        </div>
      </div>
    </div>
  );
};

export default ScanOrder;
