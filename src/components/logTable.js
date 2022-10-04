import { React, useCallback, useEffect, useState } from "react";
import PopUpBox from "./popUpBox";
import OrderDataService from "../service/orderService";
import AuthService from "../service/authService";

export const LogTable = (props) => {
  const order_number = props.order_number;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderLog, setOrderLog] = useState();
  const [popUpBox, setPopUpBox] = useState("none");

  const getOrderLog = useCallback((order_number) => {
    const serviceToExecute = async () => {
      const response = await OrderDataService.getOrderLog(order_number);
      setOrderLog(response.data.orders);
      setLoading(false);
      // do not add catch at this level
    };
    return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
      setMessage("Issue: " + err);
      setPopUpBox("block");
    });
  }, []);

  useEffect(() => {
    if (!orderLog) {
      setLoading(true);
      getOrderLog(order_number);
    }
  }, [orderLog, order_number, getOrderLog]);

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : orderLog && orderLog.data.length ? (
        <table className="table table-striped table-bordered table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Updated</th>
              <th>Order #</th>
              <th>State</th>
              <th>Office</th>
              <th>Status</th>
              <th>Closure</th>
            </tr>
          </thead>
          <tbody>
            {orderLog.data.map((row) => {
              return (
                <tr key={row.uuid}>
                  <td>{row.updated_at}</td>
                  <td>{row.order_number}</td>
                  <td>{row.usa_state}</td>
                  <td>{row.home_office_code}</td>
                  <td>{String(row.order_status_id)}</td>
                  {row.order_archived == 0 ? <td>Open</td> : <td>Cancelled</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data to display"
      )}
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};
