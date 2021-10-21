import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";

import OrderForm from "./OrderForm";

const EditOrder = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    home_office_code: "",
    usa_state: "AL", // initial value needed to avoid undefined error in OrderForm.js --> districtMatchCheck; is immediately overwritten by response.data
    // status_description: "", // to be uncommented when integrated into response.data, should be set consistently in AddOrder.js and EditOrder.js
    // selection: "select",  // to be uncommented when integrated into response.data, should be set consistently in AddOrder.js and EditOrder.js
  };
  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const mode = "edit";

  // responses from DB overwriting order.status_description, order.selection
  // initialStatusState temporary until status info integrated into response.data > initialStatusState to be folded into initialOrderState
  const initialStatusState = {
    status_description:
      "*will be set by response.data once integrated with DB*",
    selection: "select",
  };
  const [status, setStatus] = useState(initialStatusState);

  const getOrder = (id) => {
    OrderDataService.get(id)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrder(props.match.params.id);
  }, [props.match.params.id]);

  /*  not in use currently
    
  const updatePublished = (status) => {
    var data = {
      uuid: order.uuid,
      order_number: order.order_number,
      home_office_code: order.home_office_code,
      published: status,
    };

    OrderDataService.update(order.uuid, data)
      .then((response) => {
        setOrder({ ...order, published: status });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  */

  const updateOrder = () => {
    OrderDataService.update(order.uuid, order)
      .then((response) => {
        setMessage("The order was updated successfully!");
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
            status={status} // temporary until status info integrated into response.data > will then be folded into order
            setOrderFunc={setOrder}
            setStatusFunc={setStatus} // temporary until status info integrated into response.data > will then be folded into setOrder
            setMessageFunc={setMessage}
            saveOrderFunc={updateOrder}
            // updatePublishedFunc={updatePublished} not in use currently
            deleteOrderFunc={deleteOrder}
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

export default EditOrder;
