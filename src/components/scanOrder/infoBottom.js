import { React, useState } from "react";
import OrderClosed from "./infoBottom/orderClosed";
import OrderOpen from "./infoBottom/orderOpen";
import { LogTable } from "../logTable";

const InfoBottom = (props) => {
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

  const [showLog, setShowLog] = useState(false);

  return (
    <>
      {order.status.active_status === "CLOSED" ? (
        <OrderClosed
          declineUpdate={declineUpdate}
          unalteredOrder={unalteredOrder}
          revert={revert}
          revertUpdate={revertUpdate}
          saveUpdate={saveUpdate}
        />
      ) : (
        <OrderOpen
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
      <>
        <button
          onClick={() => {
            setShowLog(!showLog);
          }}
          className="btn btn-link"
        >
          {showLog ? "Hide" : "Show"} flag history
        </button>
        {showLog && (
          <LogTable order_number={order.order_number} />
        )}
      </>
    </>
  );
};

export default InfoBottom;
