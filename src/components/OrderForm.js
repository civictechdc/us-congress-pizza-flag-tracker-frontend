import React from "react";
import Select from 'react-select'
import { STATES } from "./states.js";
import { STATUSES } from "./Statuses.js";
import { baseURL } from "../http-common";

const OrderForm = (props) => {
  const {
    order,
    status,
    setOrderFunc,
    setStatusFunc,
    setMessageFunc,
    saveOrderFunc,
    mode,
    deleteOrderFunc,
  } = props;

  let optionUSStates = [];
  if (STATES) {
    optionUSStates = (
      STATES.map( state => 
        ({ label: state.name, name: 'usa_state', value: state.name })
      ))
  };

  let optionDistricts = [];
  if (STATES && order.usa_state) {
    optionDistricts = (
      STATES.filter((state) => state.name === order.usa_state)[0][
        "districts"
      ].map(district => 
        ({ label: district, name: 'home_office_code', value: district})
      ))
  };

  let optionStatuses = [];
  if (STATUSES) {
    optionStatuses = (
      STATUSES.map((status) => 
          /* Old Filter by DEMO Organization Code was here
          to be rewired to ACTUAL User Profile DB info  */
        ({ label: (`#${status.sequence_num} ${status.description}`), name: 'status', value: status.sequence_num})
      ))
  };

  const handleInputChange = (event) => {
      let { name, value } = event;
      if (event.target) {
        name = event.target.name;
        value = event.target.value;
      }
         
      console.log('Name', name);
      console.log('Value', value);

      if (name === "usa_state") {
        setOrderFunc({ ...order, home_office_code: "" });
      }

      setOrderFunc((prevOrderFunc) => {
        return { ...prevOrderFunc, [name]: value };
      });
      
      if (setMessageFunc) {
        setMessageFunc("Changes not saved, Press Update to save changes");
      };      
  };
  
  // responses from DB overwriting status values in order's state
  // handleStatusChange temporary until status info integrated into response.data
  const handleStatusChange = (event) => {
    const { name, value } = event;
    if (setStatusFunc) {
      setStatusFunc({ ...status, [name]: value });
    }
    if (setMessageFunc) {
      setMessageFunc("Changes not saved, Press Update to save changes");
    }
  };

  // putting this in Component State makes this check old state instead of what state is being updated to
  // and/or exceed maximum update depth error
  let districtMatchCheck = true;
  if (order.usa_state) {
    let currentDistricts = STATES.filter(
      (state) => state.name === order.usa_state
    );
    districtMatchCheck = currentDistricts[0].districts.includes(
      order.home_office_code
    );
    console.log("Current Office: ", order.home_office_code);
    console.log("Is Match: ", districtMatchCheck);
  };

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
        <label htmlFor="usa_state">US State:</label>{" "}
        {mode === "edit" && (
          <strong>{order.usa_state ? (
            order.usa_state
          ) : (
            '**'
          )}
          </strong> 
        )}
        <Select onChange={handleInputChange} options={optionUSStates} />
      </div>

      <div className="form-group">
        <label htmlFor="home_office_code">Congressional Office:</label>{" "}
        {mode === "edit" && (
          <strong>{order.home_office_code ? (
            order.home_office_code
          ) : (
            '**-**'
          )}
          </strong>
        )}
        {(order.usa_state) ? (
          <Select onChange={handleInputChange} options={optionDistricts}  />
        ) : (
          <input
          type="text"
          className="form-control"
          value='pick a State'
          readOnly="readOnly"
        />
        )}
      </div>

      {mode === "edit" ? (
        <>
          <div className="form-group">
            <label htmlFor="status_description">Status:</label>{" "}
            <Select onChange={handleStatusChange} options={optionStatuses} />
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
        </>
      ) : null}

      {mode === "edit" && (
        <button className="btn badge-danger mr-2" onClick={deleteOrderFunc}>
          Delete
        </button>
      )}
      <button
        disabled={
          !order.order_number ||
          !order.usa_state ||
          !order.home_office_code ||
          !districtMatchCheck
        }
        onClick={saveOrderFunc}
        className="btn btn-success"
      >
        {mode === "edit" ? "Update" : "Submit"}
      </button>

      <div>
        {!districtMatchCheck ? (
          <p>US State and Congressional Office must correspond</p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </div>
  );
};

export default OrderForm;