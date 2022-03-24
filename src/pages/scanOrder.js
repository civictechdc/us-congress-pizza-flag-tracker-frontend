import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";

import OrderInfoTop from "../components/scanOrder/orderInfoTop";
import UpdateStatusButtonOff from "../components/scanOrder/buttons/updateStatusButtonOff";
import UpdateStatusButtonOn from "../components/scanOrder/buttons/updateStatusButtonOn";

import { numSort } from "../components/sorting/sortHook";
import styles from "../style/scanOrder.module.css";

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
      if (e.response.status === 401) {
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
  let skipDesc = "";
  let nextId = null;
  let skipId = null;
  let nextSeq = null;
  let skipSeq = null;
  let nextPermission = "";
  let skipPermission = "";

  let sortedStatuses = [];
  let lifeCycle = [];
  let skip = "";

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

  if (statuses && order) {
    for (let i = 0; i < lifeCycle.length; i++) {
      if (lifeCycle[i].permission == "FED-MAIL") {
        skipDesc = lifeCycle[i].description;
        skipId = lifeCycle[i].id;
        skipSeq = lifeCycle[i].sequence_num;
        skipPermission = lifeCycle[i].permission;
        break;
      }
    }
  }

  if (
    user.office_code === "FED-MAIL" &&
    order.status.status_code === "AOC_RECEIVED"
  ) {
    skip = "true";
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
    if (user.can_update_status_for === order.home_office_code) {
      allowSTATE = "yes";
    }
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

  const handleSkip = () => {
    const updatedStatus = {
      ...order,
      order_status_id: skipId,
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

  const skipUpdate = () => {
    const updatedStatus = handleSkip();
    const activateRevertButton = "on";
    updateStatus(updatedStatus, activateRevertButton);
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <div className={styles.scanContainer}>
      <h1 className={styles.title}>Scan</h1>
      {order ? (
        <>
          <OrderInfoTop order={order} />

          {order.status.active_status === "CLOSED" ? ( // if Closed
            <>
              <div className="form-group">
                <label htmlFor="next_status">
                  <strong>Order Complete</strong>
                </label>
              </div>

              {revert ? ( // if Closed and Reverting
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
                  <UpdateStatusButtonOff saveUpdateFunc={saveUpdate} />{" "}
                  <button onClick={revertUpdate} className="btn btn-success">
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
                // if Closed and Not Reverting
                <></>
              )}
            </>
          ) : (
            // Not Closed
            <>
              {order.status.active_status === "CANCELED" ? ( // Not Closed and Cancelled
                <>
                  <div className="form-group">
                    <label htmlFor="next_status">
                      <strong>Use Edit Screen to Uncancel</strong>
                    </label>
                  </div>
                </>
              ) : (
                // Not Closed and Not Cancelled
                <>
                  {resolve ? ( // Not Closed and Not Cancelled and Resolved
                    <></>
                  ) : (
                    <>
                      {revert ? ( // Not Closed and Not Cancelled and Revert
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
                        <>
                          {skip ? ( // Not Closed or Cancelled or Revert and Skip
                            <div className="form-group">
                              <p className={styles.skipMessage1}>
                                If flag is not to be flown:
                              </p>
                              <p className={styles.skipMessage2}>
                                Hit Update to skip Architect of the Capitol.
                              </p>
                              <p htmlFor="skip" className={styles.skipMessage1}>
                                Status will be:{" "}
                                {statuses && order.status.description ? (
                                  <strong>
                                    #{skipSeq} - {skipDesc}
                                  </strong>
                                ) : (
                                  <strong>
                                    Missing data needed to generate next Status
                                  </strong>
                                )}
                              </p>
                            </div>
                          ) : (
                            // Not Closed or Cancelled or Revert or Skip
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
                        </>
                      )}
                      {revert ? (
                        <>
                          <UpdateStatusButtonOff saveUpdateFunc={saveUpdate} />{" "}
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
                              {skip ? (
                                <button
                                  onClick={skipUpdate}
                                  className={"btn btn-success"}
                                >
                                  <strong>{"UPDATE STATUS"}</strong>
                                </button>
                              ) : (
                                <>
                                  {allowUpdate ? (
                                    <UpdateStatusButtonOn
                                      saveUpdateFunc={saveUpdate}
                                    />
                                  ) : (
                                    <button
                                      onClick={refuseUpdate}
                                      className="btn btn-success"
                                      style={{ opacity: 0.6 }}
                                    >
                                      {"Update Status"}
                                    </button>
                                  )}
                                </>
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
    </div>
  );
};

export default ScanOrder;
