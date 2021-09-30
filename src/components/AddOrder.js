import React, { useState } from "react";
import OrderDataService from "../services/OrderService";
import OrderForm from './OrderForm'

const AddOrder = (props) => {
  const {existingOrder} = props;
  
  const initialOrderState = {
    id: null,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    published: false,
  };

  const [exceptionMessage, setExceptionMessage] = useState();
  const [order, setOrder] = useState(existingOrder? existingOrder: initialOrderState);
  const [submitted, setSubmitted] = useState(false);


  const saveOrder = () => {
    var data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    OrderDataService.create(data)
      .then((response) => {
        setOrder({
          id: response.data.id,
          order_number: response.data.order_number,
          home_office_code: response.data.home_office_code,
          usa_state: response.data.usa_state,
          published: response.data.published,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        setExceptionMessage("You have a problem. " + e.message);
        console.log("Debug exception", e);
      });
  };

  const newOrder = () => {
    setOrder(initialOrderState);
    setSubmitted(false);
  };

  if (exceptionMessage) {
    return (
      <div class="alert alert-warning" role="alert">
        Error {exceptionMessage}
      </div>
    );
  }

  if (submitted && !existingOrder) {
    
    return (
      <div className="submit-form">
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOrder}>
            Add a new order
          </button>
        </div>
      </div>
    );
  } else {
    
    return (
      <div>
      <OrderForm order={order} setOrder={setOrder} saveOrder={saveOrder}/>

      </div>
    );
  }
};

export default AddOrder;
