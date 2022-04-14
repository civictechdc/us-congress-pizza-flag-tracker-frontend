import { React, useState, useEffect } from "react";
import OrderClosed from "./infoBottom/orderClosed";
import OrderOpen from "./infoBottom/orderOpen";
import { LogTable } from "../LogTable";
import OrderDataService from "../../service/orderService";
import AuthService from "../../service/authService";

const InfoBottom = (props) => {
  const {
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

  const [showLog, setShowLog] = useState(false);
  const order_number = props.order.order_number;

  const getOrderLog = (order_number) => {
    const serviceCall = () => {
      return OrderDataService.getOrderLog(order_number)
        .then((response) => {
          setOrderLog(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
    }
  };

  const [orderLog, setOrderLog] = useState();

  useEffect(() => {
    if (!orderLog) {
      getOrderLog(order_number);
    }
  });

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
      <>
        <button
          onClick={() => {
            setShowLog(!showLog);
          }}
          className="btn btn-link"
        >
          {showLog ? "Hide" : "Show"} flag history
        </button>
        {showLog && <LogTable uuid={order.uuid} orderLog={orderLog} />}
      </>
    </>
  );
};

export default InfoBottom;
