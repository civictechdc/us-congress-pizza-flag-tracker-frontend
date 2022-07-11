import React, { useState, useEffect } from "react";
import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";
import OrderForm from "./orderForm";
import PopUpBoxComponent from "./popUpBoxComponent";
import { numSort } from "./sorting/sortHook";

const EditView = (props) => {
  const { editId, history } = props;

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

  const [checkSaved, setCheckSaved] = useState(true);
  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popUpBox, setPopUpBox] = useState("none");
  const mode = "edit";

  useEffect(() => {
    setLoading(true);
    OrderDataService.getOrder(editId, setOrder, false, setLoading);
  }, [editId]);

  useEffect(() => {
    if (statuses.length === 0) {
      StatusDataService.retrieveStatuses(setMessage, setStatuses, setPopUpBox);
    }
  }, [statuses]);

  const sortedStatuses = numSort(statuses, "sequence_num", "asc");

  const updateOrder = () => {
    const serviceToExecute = () => {
      return OrderDataService.update(order.uuid, order).then((response) => {
        setPopUpBox("block");
        setMessage("The order was updated successfully!");
        setCheckSaved(true);
      });
    };
    AuthService.checkTokenAndExecute(serviceToExecute).then(function (
      serviceResult
    ) {
      if (serviceResult) {
        setPopUpBox("block");
        setMessage("Issue: " + serviceResult.message);
      }
    });
  };

  const deleteOrder = () => {
    const serviceToExecute = () => {
      return OrderDataService.remove(order.uuid).then((response) => {
        history.push("/");
      });
    };
    AuthService.checkTokenAndExecute(serviceToExecute).then(function (
      serviceResult
    ) {
      if (serviceResult) {
        setPopUpBox("block");
        setMessage("Issue: " + serviceResult.message);
      }
    });
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      {order ? (
        <OrderForm
          order={order}
          checkSaved={checkSaved}
          setOrderFunc={setOrder}
          setCheckSavedFunc={setCheckSaved}
          saveOrderFunc={updateOrder}
          deleteOrderFunc={deleteOrder}
          mode={mode}
          statuses={sortedStatuses}
          loading={loading}
        />
      ) : (
        <>
          <br />
          <p>Please click on an order...</p>
        </>
      )}
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default EditView;
