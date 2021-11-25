import React, { useState } from "react";
import OrderDataService from "../services/OrderService";
import OrderForm from "./OrderForm";

const AddOrder = (props) => {
  const { existingOrder } = props;

  const initialOrderState = {
    id: null,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    published: false,
  };

  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    submitted: false,
    success: "",
    whyStatus: false,
  };

  const [order, setOrder] = useState(
    existingOrder ? existingOrder : initialOrderState
  );
  const [exceptionMessage, setExceptionMessage] = useState();
  const [message, setMessage] = useState(initialMessageState);
  const mode = "add";

  const saveOrder = () => {
    var data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    OrderDataService.create(data)
      .then((response) => {
        setMessage({ ...message, checkSaved: true, submitted: true });
      })
      .catch((e) => {
        setExceptionMessage("You have a problem. " + e.message);
      });
  };

  const newOrder = () => {
    setOrder(initialOrderState);
    setMessage(initialMessageState);
  };

  if (exceptionMessage) {
    return (
      <div class="alert alert-warning" role="alert">
        Error {exceptionMessage}
      </div>
    );
  }

  if (message.submitted && !existingOrder) {
    return (
      <div className="submit-form">
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newOrder}>
          Add a new order
        </button>
      </div>
    );
  } else {
    return (
      <>
        <OrderForm
          order={order}
          message={message}
          setOrderFunc={setOrder}
          setMessageFunc={setMessage}
          saveOrderFunc={saveOrder}
          mode={mode}
        />
      </>
    );
  }
};

export default AddOrder;
