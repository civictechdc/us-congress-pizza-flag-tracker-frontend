import React, { useState } from "react";
import OrderDataService from "../services/OrderService";

//const STATES = require('./states.json');
import { STATES } from "./states.js";

const AddOrder = () => {
  const initialOrderState = {
    id: null,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    published: false,
  };
  const [exceptionMessage, setExceptionMessage] = useState();
  const [order, setOrder] = useState(initialOrderState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

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
            <label htmlFor="usa_state">US State</label>
            <select
              value={order.usa_state}
              id="usa_state"
              onChange={handleInputChange}
              name="usa_state"
            >
              {STATES &&
                STATES.map((state, index) => {
                  return (
                    <option value={state.name} key={index}>
                      {state.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="home_office_code">Congressional Office</label>
            <select
              value={order.home_office_code}
              id="home_office_code"
              onChange={handleInputChange}
              name="home_office_code"
              required
            >
              {STATES &&
                order.usa_state &&
                STATES.filter((state) => state.name === order.usa_state)[0][
                  "districts"
                ].map((district, index) => {
                  return (
                    <option value={district} key={index}>
                      {district}
                    </option>
                  );
                })}
            </select>
          </div>

          <button
            disabled={
              !order.order_number || !order.usa_state || !order.home_office_code
            }
            onClick={saveOrder}
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
