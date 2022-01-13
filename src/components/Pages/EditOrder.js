import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import OrderDataService from "../../services/OrderService";
import OrderForm from "../OrderForm";

const EditOrder = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    home_office_code: "",
    usa_state: "",
  };

  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    submitted: false,
    success: "",
    whyStatus: false,
  };

  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState(initialMessageState);
  const mode = "edit";

  // responses from DB overwriting order.status_description
  // initialStatusState temporary until status info integrated into response.data > initialStatusState to be folded into initialOrderState
  const initialStatusState = {
    status_description: "",
  };
  const [status, setStatus] = useState(initialStatusState);

  const getOrder = (id) => {
    const serviceCall = () => {
      return OrderDataService.get(id).then((response) => {
        setOrder(response.data);
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  const updateOrder = () => {
    const serviceCall = () => {
      return OrderDataService.update(order.uuid, order).then((response) => {
        console.log(response);
        setMessage({
          ...message,
          checkSaved: true,
          success: "The order was updated successfully!",
        });
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(`error occurred while updating order: ${e}`);
    }
  };

  const deleteOrder = () => {
    const serviceCall = () => {
      return OrderDataService.remove(order.uuid).then((response) => {
        props.history.push("/orders");
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {order ? (
        <>
          <OrderForm
            order={order}
            message={message}
            status={status} // temporary until status info integrated into response.data > will then be folded into order
            setOrderFunc={setOrder}
            setStatusFunc={setStatus} // temporary until status info integrated into response.data > will then be folded into setOrder
            setMessageFunc={setMessage}
            saveOrderFunc={updateOrder}
            deleteOrderFunc={deleteOrder}
            mode={mode}
          />
          <p>{message.success}</p>
        </>
      ) : (
        <>
          <br />
          <p>Please click on an order...</p>
        </>
      )}
    </>
  );
};

export default EditOrder;
