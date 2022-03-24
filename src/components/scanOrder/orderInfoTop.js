import React, { useState, useEffect } from "react";

const OrderInfoTop = (props) => {
  const { order } = props;

  return (
    <>
      <div className="form-group">
        <label htmlFor="order_number">
          Order Number: <strong>{order.order_number}</strong>
        </label>
      </div>
    </>
  );
};

export default OrderInfoTop;
