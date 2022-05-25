import React, { useState } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import OrderForm from "../components/orderForm";
import PopUpBoxComponent from "../components/popUpBoxComponent";

const AddOrder = () => {
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
    var data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    const serviceCall = () => {
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
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      setExceptionMessage("You have a problem. " + e.message);
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

export default AddOrder;
