import React, { forwardRef } from "react";
import { baseURL } from "../http-common";

const QrCode = forwardRef((props, ref) => {
  const { order } = props;

  return (
    <div className="qr-group" ref={ref}>
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
      <img
        src={baseURL + "/qrcode/" + order.uuid}
        alt="QR Code"
        className="center"
      />
    </div>
  );
});

export default QrCode;
