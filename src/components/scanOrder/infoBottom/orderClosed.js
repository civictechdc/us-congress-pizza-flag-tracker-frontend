import React from "react";
import DeclineUpdateButtonOff from "../buttons/declineUpdateButtonOff";
import RevertStatusButtonOn from "../buttons/revertStatusButtonOn";

const OrderClosed = (props) => {
  const { declineUpdate, unalteredOrder, revert, revertUpdate, saveUpdate } =
    props;

  return (
    // if the order was already complete before user interaction
    <>
      <div className="form-group">
        <label htmlFor="next_status">
          <strong>Order Complete</strong>
        </label>
      </div>

      {revert ? ( // if user interaction caused the order to become closed
        <>
          <div className="form-group">
            <label htmlFor="prior_status">
              Prior Status:{" "}
              <strong>
                #{unalteredOrder.status.sequence_num} -{" "}
                {unalteredOrder.status.description}
              </strong>
            </label>
          </div>
          <RevertStatusButtonOn revertUpdateFunc={revertUpdate} />{" "}
          <DeclineUpdateButtonOff declineUpdateFunc={declineUpdate} />{" "}
        </>
      ) : (
        <></> // if the order was already complete before user interaction ---> then no buttons needed
      )}
    </>
  );
};

export default OrderClosed;
