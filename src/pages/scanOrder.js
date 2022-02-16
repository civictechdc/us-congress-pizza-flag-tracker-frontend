import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";
import { numSort } from "../components/sorting/sortHook";

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
      permission: "",
      active_status: "",
      status_code: "",
    },
  };

  const [order, setOrder] = useState(initialOrderState);
  const [oldOrder, setOldOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [resolve, setResolve] = useState(""); // Decline Update button
  const [revert, setRevert] = useState(""); // Revert Update button
  const [statuses, setStatuses] = useState([]);
  const [popUpBox, setPopUpBox] = useState("none");
  const loginError = "You must be logged in to view this page";
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("User: ", user)
  console.log("Home Office Code: ", order.home_office_code)

  const getOrder = (id) => {
    const serviceCall = () => {
      return OrderDataService.get(id)
        .then((response) => {
          setOrder(response.data);
          setOldOrder(response.data);
        })
        .catch((e) => {
          console.log(e);
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
        setStatuses(response.data.statuses);
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      setPopUpBox("block");
      console.log(e);
      if (e.response?.status === 401) {
        setMessage(loginError);
      } else {
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
  let nextPermission = "";

  let sortedStatuses = [];
  let lifeCycle = [];

  if (statuses && order) {
    sortedStatuses = numSort(statuses, "sequence_num", "asc");
    lifeCycle = sortedStatuses.slice();

    // Ideally backend should only have one Cancel status otherwise this will only catch the last one.
    // Prevents Cancel statuses from becoming Next Status / removes Cancel from normal lifecycle

    for (let i = 0; i < sortedStatuses.length; i++) {
      if (sortedStatuses[i].active_status === "CANCELED") {
        lifeCycle.splice(i, 1);
      }
    }
  }

  if (statuses && order) {
    const currentSeq = order.status.sequence_num;

    for (let i = 0; i < lifeCycle.length; i++) {
      if (lifeCycle[i].sequence_num > currentSeq) {
        nextDesc = lifeCycle[i].description;
        nextId = lifeCycle[i].id;
        nextSeq = lifeCycle[i].sequence_num;
        nextPermission = lifeCycle[i].permission;
        break;
      }
    }
  }

  let allowHOSS = "";
  let allowAOC = "";
  let allowMAIL = "";
  let allowSTATE = "";

  if (user) {
    if (user.can_update_status_for === "FED-HOSS") {
      allowHOSS = "yes";
    }

    if (user.can_update_status_for === "FED-AOC") {
      allowAOC = "yes";
    }

    if (user.can_update_status_for === "FED-MAIL") {
      allowMAIL = "yes";
    }

    if (user.office_code === order.home_office_code) {
      allowSTATE = "yes";
    }

    console.log("Allow State: ", allowSTATE)
    console.log("Next Permission: ", nextPermission)

    if (user.can_update_status_for === "ALL") {
      allowHOSS = "yes";
      allowAOC = "yes";
      allowMAIL = "yes";
      allowSTATE = "yes";
    }
  }

  let allowUpdate = "";

  if (nextPermission === "FED-HOSS" && allowHOSS === "yes") allowUpdate = "yes";

  if (nextPermission === "FED-AOC" && allowAOC === "yes") allowUpdate = "yes";

  if (nextPermission === "FED-MAIL" && allowMAIL === "yes") allowUpdate = "yes";

  if (nextPermission === "STATE" && allowSTATE === "yes") allowUpdate = "yes";

  const handleUpdate = () => {
    const updatedStatus = {
      ...order,
      order_status_id: nextId,
    };
    return updatedStatus;
  };

  const updateStatus = (updatedStatus, activateRevertButton) => {
    const serviceCall = () => {
      return StatusDataService.updateStatus(
        updatedStatus.uuid,
        updatedStatus
      ).then((response) => {
        setOrder(response.data);
        setPopUpBox("block");
        setMessage("The order was updated successfully!");
        if (activateRevertButton === "on") {
          setRevert("yes");
        }
        if (activateRevertButton === "off") {
          setRevert("");
        }
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
      setPopUpBox("block");
      setMessage("Update Status Error: ", e);
    }
  };

  const saveUpdate = () => {
    const updatedStatus = handleUpdate();
    const activateRevertButton = "on";
    updateStatus(updatedStatus, activateRevertButton);
  };

  const declineUpdate = () => {
    setResolve("yes");
  };

  const revertUpdate = () => {
    setOrder(oldOrder);
    const activateRevertButton = "off";
    updateStatus(oldOrder, activateRevertButton);
  };

  const refuseUpdate = () => {
    setPopUpBox("block");
    setMessage(
      "Do not have permissions for either (1) this order or (2) to advance to the next status"
    );
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
                      <strong>Use Edit Screen to Uncancel</strong>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  {resolve ? (
                    <></>
                  ) : (
                    <>
                      {revert ? (
                        <>
                          <div className="form-group">
                            <label htmlFor="prior_status">
                              Prior Status:{" "}
                              <strong>
                                #{oldOrder.status.sequence_num} -{" "}
                                {oldOrder.status.description}
                              </strong>
                            </label>
                          </div>
                        </>
                      ) : (
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
                      )}
                      {revert ? (
                        <>
                          <button
                            onClick={saveUpdate}
                            className="btn btn-success"
                            disabled
                          >
                            {"Update Status"}
                          </button>{" "}
                          <button
                            onClick={revertUpdate}
                            className="btn btn-success"
                          >
                            {"Revert Update"}
                          </button>{" "}
                          <button
                            onClick={declineUpdate}
                            className="btn btn-success"
                            disabled
                          >
                            {"Decline Update"}
                          </button>
                        </>
                      ) : (
                        <>
                          {statuses && order.status.description ? (
                            <>
                              {allowUpdate ? (
                                <button
                                  onClick={saveUpdate}
                                  className="btn btn-success"
                                >
                                  {"Update Status"}
                                </button>
                              ) : (
                                <button
                                  onClick={refuseUpdate}
                                  className="btn btn-success"
                                  style={{ opacity: 0.6 }}
                                >
                                  {"Update Status"}
                                </button>
                              )}{" "}
                              <button
                                onClick={revertUpdate}
                                className="btn btn-success"
                                disabled
                              >
                                {"Revert Update"}
                              </button>{" "}
                              <button
                                onClick={declineUpdate}
                                className="btn btn-success"
                              >
                                {"Decline Update"}
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
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