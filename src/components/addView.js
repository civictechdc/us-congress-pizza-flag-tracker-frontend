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
    text: "",
  };

  const [checkSaved, setCheckSaved] = useState(true);
  const [order, setOrder] = useState(initialOrderState);
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
          text: "The order was updated successfully!",
        });
        setCheckSaved(true);
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
            text: "Issue: " + serviceResult.message,
          });
          setCheckSaved(false);
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

  return (
    <>
      <OrderForm
        order={order}
        checkSaved={checkSaved}
        setOrderFunc={setOrder}
        setCheckSavedFunc={setCheckSaved}
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
