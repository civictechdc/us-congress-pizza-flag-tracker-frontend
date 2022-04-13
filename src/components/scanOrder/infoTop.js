import React from "react";

const InfoTop = (props) => {
  const { order } = props;

  return (
    <>
      <div className="form-group">
        <label htmlFor="order_number">
          Order Number: <strong>{order.order_number}</strong>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="usa_state">
          US State: <strong>{order.usa_state}</strong>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="home_office_code">
          Congressional Office: <strong>{order.home_office_code}</strong>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="current_status">
          Current Status:{" "}
          {order.status.description ? (
            <strong>
              #{order.status.sequence_num} - {order.status.description}
            </strong>
          ) : (
            <strong>Missing status...</strong>
          )}
        </label>
      </div>
    </>
  );
};

export default InfoTop;
