import React, { useContext, useEffect, useState } from "react";

import AuthService from "../../service/authService";
import OrderDataService from "../../service/orderService";
import StatusDataService from "../../service/statusService";

import InfoBottom from "./infoBottom";
import InfoTop from "./infoTop";
import { numSort } from "../sorting/sortHook";
import PopUpBox from "../popUpBox";
import UserContext from "../userContext";

import styles from "../../style/scanOrder.module.css";

const ScanView = (props) => {
  const { scanId } = props;

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
  const [unalteredOrder, setUnalteredOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [decline, setDecline] = useState(""); // Decline Update button
  const [revert, setRevert] = useState(""); // Revert Update button
  const [statuses, setStatuses] = useState([]);
  const [popUpBox, setPopUpBox] = useState("none");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { setUserDisplay } = useContext(UserContext);

  let user = JSON.parse(localStorage.getItem("user"));
  if (user == null) {
    user = { office_code: null };
  }

  useEffect(() => {
    setLoading(true);
    OrderDataService.getOrder(
      scanId,
      setOrder,
      setUnalteredOrder,
      setLoading
    ).catch((err) => {
      setMessage("Order Issue: " + err);
      setPopUpBox("block");
    });
  }, [scanId]);

  useEffect(() => {
    if (statuses.length === 0) {
      StatusDataService.retrieveStatuses(setStatuses).catch((err) => {
        setMessage("Status Issue: " + err);
        setPopUpBox("block");
      });
    }
  }, [statuses]);

  let nextStatus = {
    description: "",
    id: null,
    sequence_num: null,
    permission: "",
    active_status: "",
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
        nextStatus.active_status = sortedStatuses[i].active_status;
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
    const serviceToExecute = async () => {
      const response = await StatusDataService.updateStatus(
        updatedStatus.uuid,
        updatedStatus
      );
      setOrder(response.data);
      setPopUpBox("block");
      setMessage("The order was updated successfully!");
      setUpdated(true);
      if (activateRevertButton === "on") {
        setRevert("yes");
      }
      if (activateRevertButton === "off") {
        setRevert("");
      }
    };
    return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
      setMessage("Issue: " + err);
      setPopUpBox("block");
    });
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
    const currentTime = new Date().toUTCString();
    const currentTimeInMilliSeconds = Date.parse(currentTime);

    let lastUpdateTime = order.updated_at;
    lastUpdateTime += " GMT";
    lastUpdateTime = lastUpdateTime.replace(/-/g, " ");
    const lastUpdateTimeInMilliSeconds = Date.parse(lastUpdateTime);

    const milliSecondsSinceUpdate =
      currentTimeInMilliSeconds - lastUpdateTimeInMilliSeconds;

    if (
      order.status.active_status === "CLOSED" &&
      user.update_all_statuses !== "Y" &&
      milliSecondsSinceUpdate >
        (process.env.REACT_APP_THRESHOLD ||
          3600000) /* 1 hour in milliseconds */
    ) {
      setPopUpBox("block");
      setMessage(
        "Too much time has elapsed to undo a completed order; please see an Admin"
      );
    } else {
      setOrder(unalteredOrder);
      const activateRevertButton = "off";
      updateStatus(unalteredOrder, activateRevertButton);
    }
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
    if (
      message.includes(
        "401 Unauthorized"
      )
    ) {
      AuthService.logout();
      window.location.reload();
    }
    setUserDisplay();
  };

  return (
    <div className={styles.scanContainer}>
      {loading ? (
        "Loading..."
      ) : order ? (
        <>
          <InfoTop order={order} />
          <InfoBottom
            decline={decline}
            declineUpdate={declineUpdate}
            nextStatus={nextStatus}
            unalteredOrder={unalteredOrder}
            order={order}
            refuseUpdate={refuseUpdate}
            revert={revert}
            revertUpdate={revertUpdate}
            saveUpdate={saveUpdate}
            setUpdated={setUpdated}
            skip={skip}
            skipStatus={skipStatus}
            skipUpdate={skipUpdate}
            statuses={statuses}
            updated={updated}
            user={user}
          />
        </>
      ) : (
        <>
          <br />
          <p>Please click on an order...</p>
        </>
      )}
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </div>
  );
};

export default ScanView;
