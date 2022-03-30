import React from "react";
import DeclineUpdateButtonOff from "../../../buttons/declineUpdateButtonOff";
import DeclineUpdateButtonOn from "../../../buttons/declineUpdateButtonOn";
import RefuseUpdateButton from "../../../buttons/refuseUpdateButton";
import RevertStatusButtonOn from "../../../buttons/revertStatusButtonOn";
import RevertStatusButtonOff from "../../../buttons/revertStatusButtonOff";
import SkipUpdateButton from "../../../buttons/skipUpdateButton";
import UpdateStatusButtonOn from "../../../buttons/updateStatusButtonOn";
import UpdateStatusButtonOff from "../../../buttons/updateStatusButtonOff";

import styles from "../../../../../style/scanOrder.module.css";

const OrderNotDeclined = (props) => {
  const {
    allowUpdate,
    decline,
    declineUpdate,
    nextStatus,
    oldOrder,
    order,
    refuseUpdate,
    revert,
    revertUpdate,
    saveUpdate,
    skip,
    skipStatus,
    skipUpdate,
    statuses,
  } = props;

  return (
    <>
      {revert ? ( // if Not Closed and Not Cancelled and Not Declined but Reverted
        <>
          <div className="form-group">
            <label htmlFor="prior_status">
              Prior Status:{" "}
              <strong>
                #{oldOrder.status.sequence_num} - {oldOrder.status.description}
              </strong>
            </label>
          </div>
          <UpdateStatusButtonOff saveUpdateFunc={saveUpdate} />{" "}
          <RevertStatusButtonOn revertUpdateFunc={revertUpdate} />{" "}
          <DeclineUpdateButtonOff declineUpdateFunc={declineUpdate} />{" "}
        </>
      ) : (
        <>
          {skip ? ( // if Not Closed and Not Cancelled and Not Declined and Not Reverted but Skipped
            <>
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
            // if Not Closed and Not Cancelled and Not Declined and Not Reverted and Not Skipped
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
              {allowUpdate ? (
                <UpdateStatusButtonOn saveUpdateFunc={saveUpdate} />
              ) : (
                <RefuseUpdateButton refuseUpdateFunc={refuseUpdate} />
              )}{" "}
              <RevertStatusButtonOff revertUpdateFunc={revertUpdate} />{" "}
              <DeclineUpdateButtonOn declineUpdateFunc={declineUpdate} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderNotDeclined;