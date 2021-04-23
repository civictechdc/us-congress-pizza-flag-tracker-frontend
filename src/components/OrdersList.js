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

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveOrders = () => {
    OrderDataService.getAll()
      .then(response => {
        setOrders(response.data.orders);
        console.log("debug", response.data);
      })
      .catch(e => {
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
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    OrderDataService.findByTitle(searchTitle)
      .then(response => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  console.log('debug orders', orders)
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Orders List</h4>

        <ul className="list-group">
          {orders &&
            orders.map((order, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveOrder(order, index)}
                key={index}
              >
                {order.order_number} {order.usa_state} {order.coffice}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllOrders}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentOrder ? (
          <div>
            <h4>Order</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentOrder.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentOrder.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentOrder.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/orders/" + currentOrder.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Order...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;