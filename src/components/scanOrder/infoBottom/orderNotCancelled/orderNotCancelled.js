import React from "react";
import OrderNotDeclined from "./orderNotDeclined/orderNotDeclined";

const OrderNotCancelled = (props) => {
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
      {decline ? ( // hides buttons so that user can see Order information without accidently changing the order
        <></>
      ) : (
        <OrderNotDeclined
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

export default OrderNotCancelled;
