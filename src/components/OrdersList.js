import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveOrders();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    console.log(e);
    setSearchTitle(searchTitle);
  };

  const retrieveOrders = () => {
    OrderDataService.getAll()
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    setCurrentIndex(-1);
  };

  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
    setCurrentIndex(index);
  };

  const removeAllOrders = () => {
    OrderDataService.removeAll()
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByOrderNumber = () => {
    OrderDataService.findByOrderNumber(searchTitle)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const orderTbody = (
    <tbody className="flag-group">
      {orders &&
        orders.map((order, index) => (
          <tr
            className={
              "flag-group-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => setActiveOrder(order, index)}
            key={index}
          >
            <td>{order.order_number}</td>
            <td>{order.usa_state}</td>
            <td>{order.office_code}</td>
          </tr>
        ))}
    </tbody>
  );
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by order number"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByOrderNumber}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Orders List</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Order Number</th>
              <th scope="col">USA State</th>
              <th scope="col">Congressional Office</th>
            </tr>
          </thead>
          {orderTbody}
        </table>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllOrders}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentOrder ? (
          <div>
            <h4>Order</h4>
            <div>
              <label>
                <strong>Order Number:</strong>
              </label>{" "}
              {currentOrder.order_number}
            </div>
            <div>
              <label>
                <strong>Congressional Office:</strong>
              </label>{" "}
              {currentOrder.office_code}
            </div>
            <div>
              <label>
                <strong>Congressional Office:</strong>
              </label>{" "}
              {currentOrder.uuid}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentOrder.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/orders/" + currentOrder.uuid}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an order...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
