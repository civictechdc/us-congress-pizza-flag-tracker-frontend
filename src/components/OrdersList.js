import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import { Link } from "react-router-dom";
import styles from "../style/orders.module.css"
import { useSortableData } from "./Sort/SortHook";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [popUpBox, setPopUpbox] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [sortType, setSortType] = useState("numeric");

  const sortOptions = { sortedField, sortDir, sortType };
  const sortedOrders = useSortableData(orders, sortOptions);

  const loginError = "You must be logged in to view this page";

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
        if (e.response?.status === 401) {
          setErrorMessage(loginError);
        } else {
          setPopUpbox("block");
          setErrorMessage(
            e.message +
              "." +
              "Check with admin if server is down or try logging out and logging in."
          );
        }
      });
  };

  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    
  };

  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
   
  };

  const removeAllOrders = () => {
    OrderDataService.removeAll()
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
        setPopUpbox("block");
        setErrorMessage(e.message);
      });
  };

  const findByOrderNumber = () => {
    OrderDataService.findByOrderNumber(searchTitle)
      .then((response) => {
        if ("error" in response.data) {
          setErrorMessage(response.data.error);
        } else {
          console.log("found", response.data);
          setOrders(response.data.orders);
        }
      })
      .catch((e) => {
        console.log(e);
        setPopUpbox("block");
        setErrorMessage(e.message);
      });
  };

  const clearSearch = () => {
    refreshList();
    setSearchTitle("");
    setErrorMessage("");
  };

  const formatDate = (dateString) => {
    return Intl.DateTimeFormat("en-US").format(Date.parse(dateString));
  };

  let ordersToDisplay = [];
  sortedOrders ? (ordersToDisplay = sortedOrders) : (ordersToDisplay = orders);

  const orderTbody = (
    <div className={styles.flagContainer}>
      {ordersToDisplay.length &&
        ordersToDisplay.map((order, index) => (
          <div
            className={styles.flagItem}
            onClick={() => setActiveOrder(order, index)}
            key={index}
          >
            <p className={styles.orderNum}>{order.order_number}</p>
            <p className={styles.officeCode}>{order.home_office_code}</p>
            <div className={styles.statusGroup}>
              <p className={styles.description}>{order.status.description}</p>
              <p>Created On: {order.created_at}</p>
              <p>Last Updated: {order.updated_at}</p>
            </div>
            
          </div>
        ))}
    </div>
  );

  const closePopUpBox = () => {
    setPopUpbox("none");
  };

  if (errorMessage === loginError) {
    return errorMessage;
  } else
    return (
      <>
        <div>
          <div>
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
          <div className="order-container">
            <h4>Orders List</h4>

             {orderTbody}
            
            {errorMessage || searchTitle ? (
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={clearSearch}
              >
                Clear search
              </button>
            ) : (
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={removeAllOrders}
              >
                Remove All
              </button>
            )}
          </div>
          <div className="col-md-4">
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
                  {currentOrder.home_office_code}
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

                {` `}
                <Link
                  to={"/scan/" + currentOrder.uuid}
                  className="badge badge-warning"
                >
                  Scan
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

        <div className="pop-container" style={{ display: popUpBox }}>
          <div className="pop-up" onClick={closePopUpBox}>
            <h3>{errorMessage}</h3>
          </div>
        </div>
      </>
    );
};

export default OrdersList;
