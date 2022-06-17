import React, { forwardRef } from "react";
import { baseURL } from "../http-common";

const QrCode = forwardRef((props, ref) => {
  const { order } = props;

  return (
    <div className="qr-group" ref={ref}>
      <div className="formContainer item">
        <p htmlFor="order_number" className="text">
          Order Number: <strong>{order.order_number}</strong>
          <br />
          US State: <strong>{order.usa_state}</strong>
          <br />
          Congressional Office: <strong>{order.home_office_code}</strong>
        </p>
      </div>
      <img
        src={baseURL + "/qrcode/" + order.uuid}
        alt="QR Code"
        className="center item"
      />
    </div>
  );
});

export default QrCode;
