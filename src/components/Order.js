import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import { baseURL } from "../http-common";

import { STATES } from "./states.js";

const Order = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    coffice: "",
    usa_state: "",
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");

  const getOrder = (id) => {
    console.log("id", id);
    OrderDataService.get(id)
      .then((response) => {
        setCurrentOrder(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrder({ ...currentOrder, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      uuid: currentOrder.uuid,
      order_number: currentOrder.order_number,
      coffice: currentOrder.coffice,
      published: status,
    };

    OrderDataService.update(currentOrder.uuid, data)
      .then((response) => {
        setCurrentOrder({ ...currentOrder, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateOrder = () => {
    OrderDataService.update(currentOrder.uuid, currentOrder)
      .then((response) => {
        console.log(response.data);
        setMessage("The order was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteOrder = () => {
    OrderDataService.remove(currentOrder.uuid)
      .then((response) => {
        console.log(response.data);
        props.history.push("/orders");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(currentOrder);
  return (
    <div>
      {currentOrder ? (
        <div className="edit-form">
          <h4>Order</h4>
          <form>
            <div className="form-group">
              <label htmlFor="order_number">Order Number</label>
              <input
                type="text"
                className="form-control"
                id="order_number"
                name="order_number"
                value={currentOrder.order_number}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="usa_state">US State</label>
              <select
                value={currentOrder.usa_state}
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
              <label htmlFor="coffice">Congressional Office</label>
              <select
                value={currentOrder.coffice}
                id="coffice"
                onChange={handleInputChange}
                name="coffice"
                required
              >
                {STATES &&
                  currentOrder.usa_state &&
                  STATES.filter(
                    (state) => state.name === currentOrder.usa_state
                  )[0]["districts"].map((district, index) => {
                    return (
                      <option value={district} key={index}>
                        {district}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/*  Text entry fields
            <div className="form-group">
              <label htmlFor="coffice">Congressional Office</label>
              <input
               type="text"
               className="form-control"
               id="coffice"
                name="coffice"
                value={currentOrder.coffice}
                onChange={handleInputChange}
             />
            </div>
   
            <div className="form-group">
              <label htmlFor="usastate">USA State</label>
              <input
                type="text"
                className="form-control"
                id="usastate"
                name="usastate"
                value={currentOrder.usa_state}
                onChange={handleInputChange}
              />
            </div>
            */}

            <div className="form-group">
              <label>QR Code</label>
              {currentOrder.uuid}
              <img
                src={baseURL + "/qrcode/" + currentOrder.uuid}
                alt="QR Code"
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentOrder.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentOrder.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteOrder}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateOrder}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an order...</p>
        </div>
      )}
    </div>
  );
};

export default Order;
