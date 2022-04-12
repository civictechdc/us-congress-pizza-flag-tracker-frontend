import React from "react";
import OrderNotDeclined from "./orderNotDeclined/orderNotDeclined";

const OrderNotCancelled = (props) => {
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
      {decline ? ( // hides buttons so that user can see Order information without accidently changing the order
        <></>
      ) : (
        <OrderNotDeclined
          allowUpdate={allowUpdate}
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

export default OrderNotCancelled;
