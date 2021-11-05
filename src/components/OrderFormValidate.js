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
        <p>&nbsp;</p>
      )}
      {!order.usa_state ? (
        <p>Pick a US State</p>
      ) : (
        <p>&nbsp;</p>
      )}
      {!order.home_office_code ? (
        <p>Pick a Congressional Office</p>
      ) : (
        <p>&nbsp;</p>
      )}
      {!districtMatchCheck ? (
        <p>US State and Congressional Office must correspond</p>
      ) : (
        <p>&nbsp;</p>
      )}
    </aside>
  );
};            




export default OrderFormValidate;