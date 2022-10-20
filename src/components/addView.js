import React, { useContext, useState } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import OrderForm from "./orderForm";
import PopUpBox from "./popUpBox";
import UserContext from "./userContext";

const AddView = () => {
  const initialOrderState = {
    id: null,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    published: false,
  };

  const [checkSaved, setCheckSaved] = useState(true);
  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [popUpBox, setPopUpBox] = useState("none");
  const { setUserDisplay } = useContext(UserContext);
  const mode = "add";

  const saveOrder = () => {
    let data = {
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      usa_state: order.usa_state,
    };
    const serviceToExecute = async () => {
      const response = await OrderDataService.create(data);
      setOrder(initialOrderState);
      setMessage("The order was updated successfully!");
      setCheckSaved(true);
      setPopUpBox("block");
    };
    return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
      setMessage("Issue: " + err);
      setCheckSaved(false);
      setPopUpBox("block");
    });
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
    if (message.includes("401 Unauthorized")) {
      AuthService.logout();
      window.location.reload();
      setUserDisplay();   
    }
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
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default AddView;
