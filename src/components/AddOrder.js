import React, { useState } from "react";
import OrderDataService from "../services/OrderService";

const AddOrder = () => {
  const initialOrderState = {
    id: null,
    order_number: "",
    coffice: "",
    usastate: "",
    published: false
  };
  const [order, setOrder] = useState(initialOrderState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const saveOrder = () => {
    var data = {
      order_number: order.order_number,
      coffice: order.coffice,
      usa_state: order.usa_state
    };

    OrderDataService.create(data)
      .then(response => {
        setOrder({
          id: response.data.id,
          order_number: response.data.order_number,
          coffice: response.data.coffice,
          usa_state: response.data.usa_state,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newOrder = () => {
    setOrder(initialOrderState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOrder}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="order_number">Order Number</label>
            <input
              type="text"
              className="form-control"
              id="order_number"
              required
              value={order.order_number}
              onChange={handleInputChange}
              name="order_number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="coffice">Congressional Office</label>
            <input
              type="text"
              className="form-control"
              id="coffice"
              required
              value={order.coffice}
              onChange={handleInputChange}
              name="coffice"
            />
          </div>

          <div className="form-group">
            <label htmlFor="usa_state">US State</label>
            <input
              type="text"
              className="form-control"
              id="usa_state"
              required
              value={order.usa_state}
              onChange={handleInputChange}
              name="usa_state"
            />
          </div>

          <button onClick={saveOrder} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOrder;