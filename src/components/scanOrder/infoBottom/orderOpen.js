import React from "react";
import OrderNotCancelled from "./orderNotCancelled/orderNotCancelled";

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
      {order.status.active_status === "CANCELED" ? (
        <div className="form-group">
          <label htmlFor="next_status">
            <strong>Use Edit Screen to Uncancel</strong>
          </label>
        </div>
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
