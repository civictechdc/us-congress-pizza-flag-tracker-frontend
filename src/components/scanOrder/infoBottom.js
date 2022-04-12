import React from "react";
import OrderClosed from "./infoBottom/orderClosed";
import OrderOpen from "./infoBottom/orderOpen";

const InfoBottom = (props) => {
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
    user,
  } = props;

  return (
    <>
      {order.status.active_status === "CLOSED" ? (
        <OrderClosed
          declineUpdate={declineUpdate}
          oldOrder={oldOrder}
          revert={revert}
          revertUpdate={revertUpdate}
          saveUpdate={saveUpdate}
        />
      ) : (
        <OrderOpen
          allowUpdate={allowUpdate}
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
      )}
    </>
  );
};

export default InfoBottom;
