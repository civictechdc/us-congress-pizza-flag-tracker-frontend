import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import OrderForm from "./OrderForm";

const ScanOrder = (props) => {
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
  const mode = "scan";

  // responses from DB overwriting order.status_description
  // initialStatusState temporary until status info integrated into response.data > initialStatusState to be folded into initialOrderState
  const initialStatusState = {
    status_description: "",
  };
  const [status, setStatus] = useState(initialStatusState);

  const getOrder = (id) => {
    OrderDataService.get(id)
      .then((response) => {
        setOrder(response.data);
        console.log("Resp: ", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  const updateOrder = () => {
    OrderDataService.update(order.uuid, order)
      .then((response) => {
        setMessage({ ...message, checkSaved: true, success: "The order was updated successfully!"});
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteOrder = () => {
    OrderDataService.remove(order.uuid)
      .then((response) => {
        props.history.push("/orders");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
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
        <div>
          <br />
          <p>Please click on an order...</p>
        </div>
      )}
    </div>
  );
};

export default ScanOrder;
