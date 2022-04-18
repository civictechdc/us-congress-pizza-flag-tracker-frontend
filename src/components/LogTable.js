import { React, useEffect, useState } from "react";
import OrderDataService from "../service/orderService";
import AuthService from "../service/authService";

export const LogTable = (props) => {
  const order_number = props.order_number;
  const [loading, setLoading] = useState(false);

  const getOrderLog = (order_number) => {
    const serviceCall = () => {
      return OrderDataService.getOrderLog(order_number)
        .then((response) => {
          setOrderLog(response.data);
          setLoading(false);
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
      setLoading(true);
      getOrderLog(order_number);
    }
  }, [orderLog, order_number]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : orderLog && orderLog.data ? (
        <table className="table table-striped table-bordered table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Order updated at</th>
              <th>By</th>
              <th>Order number</th>
              <th>State</th>
              <th>Office code</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderLog.data.map((row) => {
              return (
                <tr key={row.uuid}>
                  <td>{row.updated_at}</td>
                  <td>(Data not available)</td>
                  <td>{row.order_number}</td>
                  <td>{row.usa_state}</td>
                  <td>{row.home_office_code}</td>
                  <td>{String(row.order_status_id)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data to display"
      )}
    </>
  );
};
