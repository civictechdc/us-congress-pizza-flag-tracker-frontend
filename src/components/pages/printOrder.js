import React, { useState, useEffect } from "react";
import { baseURL } from "../../http-common";
import AuthService from "../../service/authService";
import OrderDataService from "../../service/orderService";
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
      <div className="form-group">
        <label htmlFor="order_number">
          Order Number: <strong>{order.order_number}</strong>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="usa_state">
          US State: <strong>{order.usa_state}</strong>
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="home_office_code">
          Congressional Office: <strong>{order.home_office_code}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          QR Code: <strong>{order.uuid}</strong>
        </label>
      </div>
      <div className="form-group">
        <img
          src={baseURL + "/qrcode/" + order.uuid}
          alt="QR Code"
          class="center"
        />
      </div>
    </>
  );
};

export default PrintOrder;
