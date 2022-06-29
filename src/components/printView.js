import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import OrderDataService from "../service/orderService";
import QrCode from "../components/qrCode";
import "../style/printOrder.css";

const PrintView = (props) => {
  const { printId } = props;

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
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  useEffect(() => {
    setLoading(true);
    OrderDataService.getOrder(printId, setOrder, false, setLoading);
  }, [printId]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <QrCode ref={componentRef} order={order} />
          <ReactToPrint
            trigger={() => <button className="center">Print this out!</button>}
            content={() => componentRef.current}
          />
        </>
      )}
    </>
  );
};

export default PrintView;
