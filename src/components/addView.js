import React, { useState } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import OrderForm from "./orderForm";
import PopUpBoxComponent from "./popUpBoxComponent";

const AddView = () => {
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
    text: "",
  };

  const [order, setOrder] = useState(initialOrderState);
  const [exceptionMessage, setExceptionMessage] = useState();
  const [message, setMessage] = useState(initialMessageState);
  const [popUpBox, setPopUpBox] = useState("none");
  const mode = "add";

  const saveOrder = () => {
    let data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    const serviceToExecute = () => {
      return OrderDataService.create(data).then((response) => {
        setOrder(initialOrderState);
        setMessage({
          ...message,
          checkSaved: true,
          text: "The order was updated successfully!",
        });
        setPopUpBox("block");
      });
    };
    try {
      AuthService.checkTokenAndExecute(serviceToExecute).then(function (
        serviceResult
      ) {
        if (serviceResult != undefined) {
          setMessage({
            ...message,
            checkSaved: false,
            text: "Issue: " + serviceResult.message,
          });
          setPopUpBox("block");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  if (exceptionMessage) {
    return (
      <div class="alert alert-warning" role="alert">
        Error {exceptionMessage}
      </div>
    );
  }

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
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default AddView;
