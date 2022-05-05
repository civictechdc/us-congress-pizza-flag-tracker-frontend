import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";
import OrderForm from "../components/orderForm";
import { numSort } from "../components/sorting/sortHook";

const EditOrder = (props) => {
  const initialOrderState = {
    description: "",
    home_office_code: "",
    order_number: "",
    order_status_id: "",
    published: false,
    status: {
      active_status: "",
      created_at: "",
      description: "",
      id: "",
      permission: "",
      sequence_num: "",
      status_code: "",
      updated_at: "",
    },
    title: "",
    usa_state: "",
    uuid: null,
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
  const [statuses, setStatuses] = useState([]);
  const mode = "edit";

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

  useEffect(() => {
    if (statuses.length === 0) {
      StatusDataService.retrieveStatuses(setMessage, setStatuses);
    }
  }, [statuses]);

  const sortedStatuses = numSort(statuses, "sequence_num", "asc");

  const updateOrder = () => {
    const serviceCall = () => {
      return OrderDataService.update(order.uuid, order).then((response) => {
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
            setOrderFunc={setOrder}
            setMessageFunc={setMessage}
            saveOrderFunc={updateOrder}
            deleteOrderFunc={deleteOrder}
            mode={mode}
            statuses={sortedStatuses}
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
