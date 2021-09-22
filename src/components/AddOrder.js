import React, { useState } from "react";
import OrderDataService from "../services/OrderService";

//const STATES = require('./states.json');
import { STATES } from "./states.js";

const AddOrder = () => {
  const initialOrderState = {
    id: null,
    order_number: "",
    office_code: "",
    usa_state: "",
    published: false,
    selection: "select",
  };
  const [exceptionMessage, setExceptionMessage] = useState();
  const [order, setOrder] = useState(initialOrderState);
  const [submitted, setSubmitted] = useState(false);

  const handleUSSTATEChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value, office_code: "" }); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value }); 
  };

  const saveOrder = () => {
    var data = {
      order_number: order.order_number,
      office_code: order.office_code,
      usa_state: order.usa_state,
    };
    OrderDataService.create(data)
      .then((response) => {
        setOrder({
          id: response.data.id,
          order_number: response.data.order_number,
          office_code: response.data.office_code,
          usa_state: response.data.usa_state,
          published: response.data.published,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        setExceptionMessage("You have a problem. " + e.message);
        console.log("Debug exception",e);
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
              value={order.selection}
              // value={order.usa_state}
              id="usa_state"
              onChange={handleUSSTATEChange}
              name="usa_state"
            >
              <option value="select" key="black" hidden disabled>Select</option>
              {STATES &&
                STATES.map((state, index) => {
                  return (
                    <option value={state.name} key={index}>
                      {state.name}
                    </option>
                  );
                })}
            </select>
            {/* Temp OrderState visualizer */}
              <h4>{order.usa_state}</h4>
            {/* Temp OrderState visualizer */}  
          </div>

          <div className="form-group">
            <label htmlFor="office_code">Congressional Office</label>
            <select
              value={order.selection}
              // value={order.office_code}
              id="office_code"
              onChange={handleInputChange}
              name="office_code"
              required
            >
              <option value="select" key="black" hidden disabled>Select</option>
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
            {/* Temp OrderState visualizer */}
              <h4>{order.office_code}</h4>
            {/* Temp OrderState visualizer */}
          </div>

          <button
            disabled={!order.order_number || !order.usa_state || !order.office_code}
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
