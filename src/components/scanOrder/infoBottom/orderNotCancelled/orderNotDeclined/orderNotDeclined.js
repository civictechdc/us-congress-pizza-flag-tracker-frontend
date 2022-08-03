import React from "react";
import OrderNotReverted from "./orderNotReverted/orderNotReverted";

import DeclineUpdateButtonOff from "../../../buttons/declineUpdateButtonOff";
import RevertStatusButtonOn from "../../../buttons/revertStatusButtonOn";
import UpdateStatusButtonOff from "../../../buttons/updateStatusButtonOff";

const OrderNotDeclined = (props) => {
  const {
    declineUpdate,
    nextStatus,
    unalteredOrder,
    order,
    refuseUpdate,
    revert,
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
      {revert ? ( // if user changes there mind and wants to undo the update they just submitted before leaving the page view
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
        <OrderNotReverted
          declineUpdate={declineUpdate}
          nextStatus={nextStatus}
          order={order}
          refuseUpdate={refuseUpdate}
          revertUpdate={revertUpdate}
          saveUpdate={saveUpdate}
          skip={skip}
          skipStatus={skipStatus}
          skipUpdate={skipUpdate}
          statuses={statuses}
          user={user}
        />
      )}
    </>
  );
};

export default OrderNotDeclined;
