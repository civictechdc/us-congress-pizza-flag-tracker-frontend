import React from "react";

const OrderFormValidate = (props) => {
  const {
    districtMatchCheck,
    order,
  } = props;

  return (
    <aside>
      {!order.order_number ? (
        <p>Enter a valid Order Number</p>
      ) : (
        ""
      )}
      {!order.usa_state ? (
        <p>Pick a US State</p>
      ) : (
        ""
      )}
      {!order.home_office_code ? (
        <p>Pick a Congressional Office</p>
      ) : (
        ""
      )}
      {!districtMatchCheck ? (
        <p>US State and Congressional Office must correspond</p>
      ) : (
        ""
      )}
    </aside>
  );
};            




export default OrderFormValidate;