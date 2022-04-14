import { React, useEffect, useState } from "react";

export const LogTable = (props) => {
  const orderLog = props.orderLog;

  return (
    <>
      {orderLog && (
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
      )}
    </>
  );
};
