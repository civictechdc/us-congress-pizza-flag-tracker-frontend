import { React, useCallback, useContext, useEffect, useState } from "react";
import OrderDataService from "../service/orderService";
import AuthService from "../service/authService";
import UserContext from "./userContext";
import PopUpBox from "./popUpBox";

export const LogTable = (props) => {
  const { order_number, setUpdated, updated } = props;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderLog, setOrderLog] = useState();
  const [popUpBox, setPopUpBox] = useState("none");
  const { setUserDisplay } = useContext(UserContext);

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
    if ((orderLog && !updated) == true) return;

    setLoading(true);
    getOrderLog(order_number);
    setUpdated(false);
  }, [getOrderLog, order_number, orderLog, setUpdated, updated]);

  const closePopUpBox = () => {
    setPopUpBox("none");
    if (
      message.includes(
        "401 Unauthorized"
      )
    ) {
      AuthService.logout();
      window.location.reload();
    }
    setUserDisplay();
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
