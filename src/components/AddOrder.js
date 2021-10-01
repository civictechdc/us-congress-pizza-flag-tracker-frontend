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
    // selection: "select",  // to be uncommented when integrated into response.data, should be set consistently in AddOrder.js and Order.js
  };
  const [exceptionMessage, setExceptionMessage] = useState();
  const [order, setOrder] = useState(existingOrder? existingOrder: initialOrderState);
  const [submitted, setSubmitted] = useState(false);

  // responses from DB overwriting order.status_description, order.selection
  // initialStatusState temporary until status info integrated into response.data > initialStatusState to be folded into initialOrderState
  // AddOrder doesn't deal with Status per se but contains selection element that should be consistent in AddOrder.js and Order.js
  const initialStatusState = {
    selection: "select",
  }
  const [status, setStatus] = useState(initialStatusState);

  const saveOrder = () => {
    var data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    OrderDataService.create(data)
      .then((response) => {

        /*    response.data is logging "Created One"
              response.data.* is logging undefined
           
              when this code block is active > generating error:

              index.js:1 Warning: A component is changing a controlled input to be uncontrolled. 
              This is likely caused by the value changing from a defined to undefined, which 
              should not happen. Decide between using a controlled or uncontrolled input element
              for the lifetime of the component.
              
              when this code is commented out, code seems to run fine without the above error
           
              what purpose does this serve?
              is it vestigial or needed for future code?

        setOrder({
          id: response.data.id,
          order_number: response.data.order_number,
          home_office_code: response.data.home_office_code,
          usa_state: response.data.usa_state,
          published: response.data.published,
          // selection: response.data.selection // maybe?
        });
        
        console.log("Response Data: ", response.data);
        */

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
        <OrderForm
          order={order}
          status={status} // temporary until status info integrated into response.data > will then be folded into order
          setOrder={setOrder}
          setStatus={setStatus}  // temporary until status info integrated into response.data > will then be folded into setOrder
          saveOrder={saveOrder}
        />
      </div>
    );
  }
};

export default AddOrder;
