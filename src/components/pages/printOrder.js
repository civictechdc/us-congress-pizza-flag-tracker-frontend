import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import AuthService from "../../service/authService";
import OrderDataService from "../../service/orderService";
import QrCode from "./qrCode";
import "./printOrder.css";

const PrintOrder = (props) => {
  const initialOrderState = {
    uuid: null,
    title: "",
    description: "",
    published: false,
    order_number: "",
    home_office_code: "",
    usa_state: "",
    order_status_id: "",
    status: {
      description: "",
      id: "",
      sequence_num: "",
      permission: "",
      active_status: "",
      status_code: "",
    },
  };

  const [order, setOrder] = useState(initialOrderState);
  const componentRef = useRef();

  const getOrder = (id) => {
    const serviceCall = () => {
      return OrderDataService.get(id)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((e) => {
          console.log(e);
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

  return (
    <>
      <QrCode ref={componentRef} order={order} />
      <ReactToPrint
        trigger={() => <button className="center">Print this out!</button>}
        content={() => componentRef.current}
      />
    </>
  );
};

export default PrintOrder;
