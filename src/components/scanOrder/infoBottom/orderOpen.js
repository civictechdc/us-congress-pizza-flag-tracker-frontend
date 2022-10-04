import React from "react";
import OrderNotCancelled from "./orderNotCancelled/orderNotCancelled";
import { editOrderControl } from "../../permissions";

const OrderOpen = (props) => {
  const {
    decline,
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
      {order.archived === "1" ? (
        editOrderControl() ? (
          <div className="form-group statusLabel">
            <label htmlFor="next_status">
              <strong>Use Edit Screen to Uncancel</strong>
            </label>
          </div>
        ) : (
          <div className="form-group statusLabel">
            <label htmlFor="next_status">
              <strong>Contact IT Admin to Uncancel</strong>
            </label>
          </div>
        )
      ) : (
        <OrderNotCancelled
          decline={decline}
          declineUpdate={declineUpdate}
          nextStatus={nextStatus}
          unalteredOrder={unalteredOrder}
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
      )}
    </>
  );
};

export default OrderOpen;
