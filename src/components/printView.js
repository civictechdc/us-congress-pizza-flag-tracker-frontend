import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";

import OrderDataService from "../service/orderService";

import { editOrderControl } from "./permissions";
import PopUpBox from "./popUpBox";
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

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState("");
  const [popUpBox, setPopUpBox] = useState("none");

  const componentRef = useRef();

  const updateLink = "/scan/" + order.uuid;
  const editLink = "/edit/" + order.uuid;

  useEffect(() => {
    setLoading(true);
    OrderDataService.getOrder(printId, setOrder, false, setLoading).catch(
      (err) => {
        setMessage("Order Issue: " + err);
        setPopUpBox("block");
      }
    );
  }, [printId]);

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="printContainer">
          <div className="titleContainer">
            <h1 className="title">Print</h1>
          </div>
          <div className="linkContainer">
            {editOrderControl() ? (
              <Link to={editLink}>Edit</Link>
            ) : (
              <Link style={{ visibility: "hidden" }} to={editLink}>
                Edit
              </Link>
            )}
            <Link to={updateLink}>Update</Link>
          </div>
          <QrCode ref={componentRef} order={order} />
          <ReactToPrint
            trigger={() => <button className="center">Print this out!</button>}
            content={() => componentRef.current}
          />
        </div>
      )}
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default PrintView;
