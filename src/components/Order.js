import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";

import OrderForm from "./OrderForm";

const Order = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    home_office_code: "",
    usa_state: "AL", // initial value needed to avoid undefined error in OrderForm.js districtMatchCheck; is immediately overwritten by response.data
    // status_description: "", // to be uncommented when integrated into response.data, should be set consistently in AddOrder.js and Order.js
    // selection: "select",  // to be uncommented when integrated into response.data, should be set consistently in AddOrder.js and Order.js
  };
  const [currentOrder, setCurrentOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const mode = "edit";

  // responses from DB overwriting order.status_description, order.selection
  // initialStatusState temporary until status info integrated into response.data > initialStatusState to be folded into initialOrderState
  const initialStatusState = {
    status_description: "*will be set by response.data once integrated with DB*",
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

  const updatePublished = (status) => {
    var data = {
      uuid: currentOrder.uuid,
      order_number: currentOrder.order_number,
      home_office_code: currentOrder.home_office_code,
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

  return (
    <div>
      {currentOrder ? (
        <>
          <OrderForm
            order={currentOrder}
            status={currentStatus} // temporary until status info integrated into response.data > will then be folded into order
            setOrder={setCurrentOrder}
            setStatus={setCurrentStatus}  // temporary until status info integrated into response.data > will then be folded into setOrder
            updateMessage={setMessage}
            saveOrder={updateOrder}
            updatePublished={updatePublished}
            deleteOrder={deleteOrder}
            mode={mode}
          />
          <p>{message}</p>
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

export default Order;
