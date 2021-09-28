import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import { baseURL } from "../http-common";

import { STATES } from "./states.js";
import { STATUSES, DEPTCODES } from "./Statuses.js";

const Order = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    office_code: "",
    usa_state: "",
    current_description: "",
    selection: "select",
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");

  // responses from DB overwriting currentOrder.current_description, currentOrder.selection
  // initialStatusState temporary until status info integrated into reponse.data
  const initialStatusState = {
    current_description: "*will be set by props once integrated with DB*",  // will be set by props once integrated with DB
    selection: "select",
  }
  const [currentStatus, setCurrentStatus] = useState(initialStatusState);

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

  // responses from DB overwriting currentOrder.current_description, currentOrder.selection
  // handleStatusChange temporary until status info integrated into reponse.data
  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setCurrentStatus({ ...currentStatus, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      uuid: currentOrder.uuid,
      order_number: currentOrder.order_number,
      office_code: currentOrder.office_code,
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

            <h4>{currentOrder.current_description}</h4>
            
            <div className="form-group">
              <label htmlFor="office_code">Congressional Office</label>
              <select
                value={currentOrder.office_code}
                id="office_code"
                onChange={handleInputChange}
                name="office_code"
                required
              >
                {/* {STATES &&
                  currentOrder.usa_state &&
                  STATES.filter(
                    (state) => state.name === currentOrder.usa_state
                  ).filter((d) => d) &&  (
                 <option value={currentOrder.office_code}>
                        {currentOrder.office_code}
                      </option>)} */}
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

            {/* ------------------------------------------------------ */}
            <div>Current: {currentStatus.current_description}</div>
            <div className="form-group">
              <label htmlFor="current_description">
                <strong>Status: </strong>
              </label>
              {/* {currentOrder.published ? "Published" : "Pending"} */}
              <select
                value={currentStatus.selection}
                // defaultValue={"select"}            
                // value={currentOrder.current_description}
                id="current_description"
                onChange={handleStatusChange}
                name="current_description"
                >
                <option value="select" key="blank" hidden disabled>&nbsp;Select</option>
                {/* Need styling advise -low priority */}
                {STATUSES && STATUSES.map((element, index) => {
                  {/* if ((currentOrder.login_office_code === element.office_code) || 
                  (currentOrder.login_office_code === "ADMIN") || 
                  ((element.office_code === "ALL") && (currentOrder.login_office_code !== "not logged in"))
                  ) {
                    return (
                      <option value={element.description} key={index}>
                        #{element.sequence_num} {element.description}
                      </option>              
                    );
                  } else return (<option hidden key={index} />)  // handle "Array.prototype.map() expects a value to be returned at the end of arrow function array-callback-return" error
                  */}
                  return (
                    <option value={element.description} key={index}>
                      #{element.sequence_num} {element.description}
                    </option>              
                  );
                })}
              </select>              
            </div>
            {/* ------------------------------------------------------ */}

            <div className="form-group">
              <label>QR Code</label>
              {currentOrder.uuid}
              <img
                src={baseURL + "/qrcode/" + currentOrder.uuid}
                alt="QR Code"
              />
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
