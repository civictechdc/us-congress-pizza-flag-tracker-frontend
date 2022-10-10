import React from "react";
import { Link } from "react-router-dom";

import styles from "../../style/scanOrder.module.css";

const InfoTop = (props) => {
  const { order } = props;

  const editLink = "/orders/" + order.uuid;
  const printLink = "/print/" + order.uuid;

  return (
    <>
      <h1 className={styles.title}>Update</h1>
      <div className="linkContainer">
        <Link to={editLink}>Edit</Link>
        <Link to={printLink}>Print</Link>
      </div>

      <div className={styles.constituentBox}>
        {order.person === undefined ? (
          <></>
        ) : (
          <>
            <h5 className={styles.constituent}>{order.person.name}</h5>
            <h5 className={styles.constituent}>{order.person.phone}</h5>
            <h5 className={styles.constituent}>{order.person.address}</h5>
            <h5 className={styles.constituent}>{order.person.town}</h5>
          </>
        )}
        <br></br>
        <h5>Order Number: {order.order_number}</h5>
        <h5>US State: {order.usa_state}</h5>
        <h5>District: {order.home_office_code}</h5>
        <br></br>
      </div>
      {order.archived === "1" ? (
        <div className="form-group statusLabel">
          <label htmlFor="next_status">
            <strong>Order canceled</strong>
          </label>
        </div>
      ) : (
        <div className="form-group statusLabel">
          <label htmlFor="current_status">
            Current Status:{" "}
            {order.status.description ? (
              <strong>
                #{order.status.sequence_num} - {order.status.description}
              </strong>
            ) : (
              <strong>Missing status...</strong>
            )}
          </label>
        </div>
      )}
    </>
  );
};

export default InfoTop;
