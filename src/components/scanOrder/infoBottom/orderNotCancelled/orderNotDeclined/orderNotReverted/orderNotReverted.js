import React from "react";

import DeclineUpdateButtonOn from "../../../../buttons/declineUpdateButtonOn";
import RefuseUpdateButton from "../../../../buttons/refuseUpdateButton";
import RevertStatusButtonOff from "../../../../buttons/revertStatusButtonOff";
import SkipUpdateButton from "../../../../buttons/skipUpdateButton";
import UpdateStatusButtonOn from "../../../../buttons/updateStatusButtonOn";

import styles from "../../../../../../style/scanOrder.module.css";

const OrderNotReverted = (props) => {
  const {
    declineUpdate,
    nextStatus,
    order,
    refuseUpdate,
    revertUpdate,
    saveUpdate,
    skip,
    skipStatus,
    skipUpdate,
    statuses,
    user,
  } = props;

  return (
    <>
      {skip ? ( // if user has the flag package and need to bring the order forward to their agency skipping prior agencies
        <>
          <div className="form-group">
            <p className={styles.skipMessage1}>If flag is not to be flown:</p>
            <p className={styles.skipMessage2}>
              Hit Update to skip Architect of the Capitol.
            </p>
            <p htmlFor="skip" className={styles.skipMessage1}>
              Status will be:{" "}
              {statuses && order.status.description ? (
                <strong>
                  #{skipStatus.sequence_num} - {skipStatus.description}
                </strong>
              ) : (
                <strong>Missing data needed to generate next Status</strong>
              )}
            </p>
          </div>
          <SkipUpdateButton skipUpdateFunc={skipUpdate} />{" "}
          <RevertStatusButtonOff revertUpdateFunc={revertUpdate} />{" "}
          <DeclineUpdateButtonOn declineUpdateFunc={declineUpdate} />
        </>
      ) : (
        // basic selection of buttons available to user when no special circumstances apply
        <>
          <div className="form-group">
            <label htmlFor="next_status">
              Next Status:{" "}
              {statuses && order.status.description ? (
                <strong>
                  #{nextStatus.sequence_num} - {nextStatus.description}
                </strong>
              ) : (
                <strong>Missing data needed to generate next Status</strong>
              )}
            </label>
          </div>
          {user &&
          (nextStatus.permission === user.office_code ||
            (nextStatus.permission === "STATE" &&
              user.office_code === order.home_office_code) ||
            user.update_all_statuses === "Y") ? (
            <UpdateStatusButtonOn saveUpdateFunc={saveUpdate} />
          ) : (
            <RefuseUpdateButton refuseUpdateFunc={refuseUpdate} />
          )}
          <RevertStatusButtonOff revertUpdateFunc={revertUpdate} />{" "}
          <DeclineUpdateButtonOn declineUpdateFunc={declineUpdate} />
        </>
      )}
    </>
  );
};

export default OrderNotReverted;
