import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import OrderDataService from "../services/OrderService";
import StatusDataService from "../services/StatusService";
import { numSort } from "./Sort/SortHook";

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

  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [popUpBox, setPopUpBox] = useState("none");
  const loginError = "You must be logged in to view this page";

  const getOrder = (id) => {
    const serviceCall = () => {
      return OrderDataService.get(id)
        .then((response) => {
          setOrder(response.data);
          console.log("Get Order: ", response.data);
        })
        .catch((e) => {
          console.log("Get Order Error: ", e);
        });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  const retrieveStatuses = () => {
    const serviceCall = () => {
      return StatusDataService.getStatus().then((response) => {
        console.log("Statuses: ", response.data.statuses);
        setStatuses(response.data.statuses);
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log("Get Status Error: ", e);
      if (e.response?.status === 401) {
        setMessage(loginError);
      } else {
        setPopUpBox("block");
        setMessage(
          e.message +
            "." +
            "Check with admin if server is down or try logging out and logging in."
        );
      }
    }
  };

  useEffect(() => {
    if (statuses.length === 0) {
      retrieveStatuses();
    }
  }, [statuses]);

  let nextDesc = "";
  let nextId = null;
  let nextSeq = null;
  let nextStatusFedOfficeCode = "";
  let nextActiveStatus = "";
  let nextStatusCode = "";

  let cancelDesc = "";
  let cancelId = "";
  let cancelSeq = null;
  let cancelStatusFedOfficeCode = "";
  let cancelActiveStatus = "";
  let cancelStatusCode = "";

  let sortedStatuses = [];
  let lifeCycle = [];

  if (statuses && order) {
    sortedStatuses = numSort(statuses, "sequence_num", "asc");
    lifeCycle = sortedStatuses.slice();

    // ideally backend should only have one Cancel status otherwise this will only catch the last one
    // prevents Cancel statuses from becoming Next Status / removes Cancel from normal lifecycle

    for (let i = 0; i < sortedStatuses.length; i++) {
      if (sortedStatuses[i].active_status === "CANCELED") {
        cancelDesc = sortedStatuses[i].description;
        cancelId = sortedStatuses[i].id;
        cancelSeq = sortedStatuses[i].sequence_num;
        cancelStatusFedOfficeCode =
          sortedStatuses[i].status_federal_office_code;
        cancelActiveStatus = sortedStatuses[i].active_status;
        cancelStatusCode = sortedStatuses[i].status_code;
        lifeCycle.splice(i, 1);
      }
    }

    const currentSeq = order.status.sequence_num;

    for (let i = 0; i < lifeCycle.length; i++) {
      if (lifeCycle[i].sequence_num > currentSeq) {
        nextDesc = lifeCycle[i].description;
        nextId = lifeCycle[i].id;
        nextSeq = lifeCycle[i].sequence_num;
        nextStatusFedOfficeCode = lifeCycle[i].status_federal_office_code;
        nextActiveStatus = lifeCycle[i].active_status;
        nextStatusCode = lifeCycle[i].status_code;
        break;
      }
    }
  }

  const handleUpdate = () => {
    const updatedOrder = {
      ...order,
      order_status_id: nextId,
      status: {
        description: nextDesc,
        id: nextId,
        sequence_num: nextSeq,
        status_federal_office_code: nextStatusFedOfficeCode,
        active_status: nextActiveStatus,
        status_code: nextStatusCode,
      },
    };
    return updatedOrder;
  };

  const handleCancel = () => {
    const updatedOrder = {
      ...order,
      order_status_id: cancelId,
      status: {
        description: cancelDesc,
        id: cancelId,
        sequence_num: cancelSeq,
        status_federal_office_code: cancelStatusFedOfficeCode,
        active_status: cancelActiveStatus,
        status_code: cancelStatusCode,
      },
    };
    return updatedOrder;
  };

  const updateOrder = (updatedOrder) => {
    const serviceCall = () => {
      return OrderDataService.update(updatedOrder.uuid, updatedOrder).then(
        (response) => {
          setOrder(response.data);
          console.log("Update Resp: ", response);
          setPopUpBox("block");
          setMessage("The order was updated successfully!");
        }
      );
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      setPopUpBox("block");
      setMessage("Update Status Error: ", e);
    }
  };

  const saveUpdate = () => {
    const updatedOrder = handleUpdate();
    updateOrder(updatedOrder);
  };

  const cancelOrder = () => {
    const updatedOrder = handleCancel();
    updateOrder(updatedOrder);
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
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
              {order.status.active_status === "CANCELED" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="next_status">
                      <strong>
                        Contact Admin with Edit permissions if you need to
                        uncancel
                      </strong>
                    </label>
                  </div>
                </>
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
                        <strong>
                          Missing data needed to generate next Status
                        </strong>
                      )}
                    </label>
                  </div>
                  {order.status.description ? (
                    <button onClick={saveUpdate} className="btn btn-success">
                      {"Update Status"}
                    </button>
                  ) : (
                    <button
                      onClick={saveUpdate}
                      className="btn btn-success"
                      disabled
                    >
                      {"Update Status"}
                    </button>
                  )}
                </>
              )}{" "}
            </>
          )}
          {order.status.description === "Order canceled" ? (
            <></>
          ) : (
            <>
              {order.status.description ? (
                <button onClick={cancelOrder} className="btn btn-success">
                  {"Cancel Order"}
                </button>
              ) : (
                <button
                  onClick={cancelOrder}
                  className="btn btn-success"
                  disabled
                >
                  {"Cancel Order"}
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <br />
          <p>Please click on an order...</p>
        </>
      )}
      <div className="pop-container" style={{ display: popUpBox }}>
        <div className="pop-up" onClick={closePopUpBox}>
          <h3>{message}</h3>
        </div>
      </div>
    </>
  );
};

export default ScanOrder;
