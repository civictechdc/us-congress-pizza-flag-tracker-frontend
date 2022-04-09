import { React, useState } from "react";
import OrderClosed from "./infoBottom/orderClosed";
import OrderOpen from "./infoBottom/orderOpen";
import { LogTable } from "../LogTable";

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
  } = props;

  const [showLog, setShowLog] = useState(false);

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
          <LogTable uuid={order.uuid} order_number={order.order_number} />
        )}
      </>
    </>
  );
};

export default InfoBottom;
