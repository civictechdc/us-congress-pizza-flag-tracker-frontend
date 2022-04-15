import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";

import InfoBottom from "../components/scanOrder/infoBottom";
import InfoTop from "../components/scanOrder/infoTop";

import { numSort } from "../components/sorting/sortHook";

import styles from "../style/scanOrder.module.css";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isDate from "date-fns/isDate";
import parseJSON from "date-fns/parseJSON";
import { format, parseISO } from "date-fns";

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
  const [decline, setDecline] = useState(""); // Decline Update button
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

  console.log("Order: ", order);

  //  let distance = formatDistanceToNow(new Date(order.updated_at))
  //  console.log("Distance to Now: ", distance);

  console.log("Update Time: ", order.updated_at);
  const result = isDate(order.updated_at);
  console.log("Is Date? ", result);
  const result2 = parseJSON(order.updated_at);
  console.log("Parse Date: ", result2);
  const result3 = isDate(result2);
  console.log("Is Date? ", result3);
  const result4 = parseISO(order.updated_at);
  console.log("ISO: ", result4);
  const result5 = isDate(result4);
  const result10 = Date.now();
  console.log("Now: ", result10);
  const result11 = Date.parse(order.updated_at);
  console.log("Updated: ", result11);

  const diff = result10 - result11;
  console.log("Time Diff: ", diff);
  //  const result6 = format(parseISO(result4), "MMM dd h:m a");
  //  console.log("Formatted ISO: ", result6);
  //  const distance = formatDistanceToNow(result6);
  //  console.log("Distance to Now: ", distance);

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

  let nextStatus = {
    description: "",
    id: null,
    sequence_num: null,
    permission: "",
  };

  let skipStatus = {
    description: "",
    id: null,
    sequence_num: null,
    permission: "",
  };

  let sortedStatuses = numSort(statuses, "sequence_num", "asc");
  let skip = "";

  const removeCancelStatus = () => {
    for (let i = 0; i < sortedStatuses.length; i++) {
      if (sortedStatuses[i].active_status === "CANCELED") {
        sortedStatuses.splice(i, 1);
        i--;
      }
    }
  };

  const calculateNextStatus = () => {
    for (let i = 0; i < sortedStatuses.length; i++) {
      if (sortedStatuses[i].sequence_num > order.status.sequence_num) {
        nextStatus.description = sortedStatuses[i].description;
        nextStatus.id = sortedStatuses[i].id;
        nextStatus.sequence_num = sortedStatuses[i].sequence_num;
        nextStatus.permission = sortedStatuses[i].permission;
        break;
      }
    }
  };

  const calculateBypassArchitectOfCapital = () => {
    for (let i = 0; i < sortedStatuses.length; i++) {
      if (sortedStatuses[i].permission == "FED-MAIL") {
        skipStatus.description = sortedStatuses[i].description;
        skipStatus.id = sortedStatuses[i].id;
        skipStatus.sequence_num = sortedStatuses[i].sequence_num;
        skipStatus.permission = sortedStatuses[i].permission;
        break;
      }
    }
  };

  if (statuses && order) {
    removeCancelStatus();
    calculateNextStatus();
    calculateBypassArchitectOfCapital();
  }

  if (
    user.office_code === ("FED-MAIL" || "FED-MAIL-ADMIN") &&
    order.status.status_code === "HOSS_VERIFIED"
  ) {
    skip = "true";
  }

  const handleUpdate = () => {
    const updatedStatus = {
      ...order,
      order_status_id: nextStatus.id,
    };
    return updatedStatus;
  };

  const handleSkip = () => {
    const updatedStatus = {
      ...order,
      order_status_id: skipStatus.id,
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
    setDecline("yes");
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
          <InfoTop order={order} />
          <InfoBottom
            decline={decline}
            declineUpdate={declineUpdate}
            nextStatus={nextStatus}
            oldOrder={oldOrder}
            order={order}
            refuseUpdate={refuseUpdate}
            revert={revert}
            revertUpdate={revertUpdate}
            saveUpdate={saveUpdate}
            skip={skip}
            skipStatus={skipStatus}
            skipUpdate={skipUpdate}
            statuses={statuses}
            user={user}
          />
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
