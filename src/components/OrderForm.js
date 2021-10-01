import React from "react";
import { STATES } from "./states.js";
import { STATUSES /*, ORGCODES */ } from "./Statuses.js";
import { baseURL } from "../http-common";

const OrderForm = (props) => {
  const { order, status, setOrder, setStatus, updateMessage, saveOrder, mode, deleteOrder } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (mode !== "edit" && name === "usa_state") {
      setOrder({ ...order, [name]: value, home_office_code: "" });
    } else {
      setOrder({ ...order, [name]: value });
    }
    if (updateMessage) {
      updateMessage("Changes not saved, Press Update to save changes");
    }
  };

  // responses from DB overwriting status values in order's state
  // handleStatusChange temporary until status info integrated into response.data
  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setStatus({ ...status, [name]: value });
    updateMessage("Changes not saved, Press Update to save changes");
  };

  let districtMatchCheck = true;  // putting this in Component State makes this check old state instead of what state is being updated to                                   
  if (mode === "edit") {          // and/or exceed maximum update depth
    let currentDistricts = STATES.filter((state) => state.name === order.usa_state);
    console.log("Current US State's Disticts: ", currentDistricts[0].districts);
    districtMatchCheck = currentDistricts[0].districts.includes(order.home_office_code);
    console.log("Current Office: ", order.home_office_code);
    console.log("Is Match: ", districtMatchCheck);
  }

  return (
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
        <div>
          <label htmlFor="usa_state">
            US State: 
          </label>
          {" "}
          <strong>
            {order.usa_state
              ? order.usa_state
              : "**"
            }
          </strong>            
        </div>
        <select
          value={status.selection} // change to {order.selection} after user db integrated
          id="usa_state"
          onChange={handleInputChange}
          name="usa_state"
        >
          <option value="select" key="blank" hidden disabled>Select</option> 
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
        <div>
          <label htmlFor="home_office_code">
            Congressional Office: 
          </label>
          {" "}
          {order.usa_state
            ? <strong>
                {order.home_office_code
                  ? order.home_office_code
                  : "**-**"
                }
              </strong>   
            : <strong>
                Please choose a US State
              </strong>  
          }  
        </div>
        <select
          value={status.selection} // change to {order.selection} after user db integrated
          id="home_office_code"
          onChange={handleInputChange}
          name="home_office_code"
          required
        >
          <option value="select" key="blank" hidden disabled>Select</option>
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

      {mode === "edit" ? (
        <>
          <div className="form-group">
            <div>
              <label htmlFor="status_description">
                Status: 
              </label>
              {" "}
              <strong>{status.status_description}</strong>
            </div> 
            <select
              value={status.selection}  // change to {order.selection} after user db integrated
              id="status_description"
              onChange={handleStatusChange}
              name="status_description"
              >
              <option value="select" key="blank" hidden disabled>Select</option>
              {STATUSES && STATUSES.map((element, index) => {
                /* Old Filter by DEMO Organization Code was here
                   to be rewired to ACTUAL User Profile DB info  */
                return (
                  <option value={element.description} key={index}>
                    #{element.sequence_num} {element.description}
                  </option>              
                );     
              })}
            </select>
          </div>

          <div className="form-group">
            <label>QR Code</label>
            {order.uuid}
            <img
              src={baseURL + "/api/qrcode/" + order.uuid}
              alt="QR Code"
              align="right"
            />
          </div>
          {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {order.published ? "Published" : "Pending"}
            </div> */}
        </>
      ) : null}

      {mode === "edit" && (
        <button className="btn badge-danger mr-2" onClick={deleteOrder}>
          Delete
        </button>
      )}

      <button
        disabled={
          !order.order_number || !order.usa_state || !order.home_office_code  || !districtMatchCheck
        }
        onClick={saveOrder}
        className="btn btn-success"
        >
        {mode === "edit" ? "Update" : "Submit"}
      </button>
      
      <div>
        {!districtMatchCheck
          ? (<p>US State and Congressional Office must correspond</p>)
          : <></> 
        }
      </div>
    </div>
  );
};

export default OrderForm;
