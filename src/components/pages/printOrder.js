import React, { useState, useEffect } from "react";
import { baseURL } from "../../http-common";
import OrderDataService from "../../service/orderService";

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
        <label>QR Code</label>
        {order.uuid}
        <img
          src={baseURL + "/qrcode/" + order.uuid}
          alt="QR Code"
          align="right"
        />
      </div>
    </>
  );
};

export default PrintOrder;
