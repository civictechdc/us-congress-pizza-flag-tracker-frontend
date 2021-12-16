import React, { useState, useEffect } from "react";
import OrderDataService from "../services/OrderService";
import { Link } from "react-router-dom";
import styles from "../style/orders.module.css"
//import { useSortableData } from "./Sort/SortHook";


const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [popUpBox, setPopUpbox] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
 // const [sortedField, setSortedField] = useState(null);
 // const [sortDir, setSortDir] = useState("asc");
 // const [sortType, setSortType] = useState("numeric");

  //const sortOptions = { sortedField, sortDir, sortType };
  //const sortedOrders = useSortableData(orders, sortOptions);

  const loginError = "You must be logged in to view this page";

  const retrieveOrders = () => {
    const serviceCall = () => {
      return OrderDataService.getAll().then((response) => {
        setOrders(response.data.orders);
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      setErrorMessage(e.message);
      setPopUpbox("block");
    }
  };

  useEffect(() => {
    const retrieveOrders = () => {
      const serviceCall = () => {
        return OrderDataService.getAll().then((response) => {
          setOrders(response.data.orders);
        });
      };
      AuthService.refreshTokenWrapperFunction(serviceCall);
    };
    retrieveOrders();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    console.log(e);
    setSearchTitle(searchTitle);
  };

  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    
  };

  const setActiveOrder = (order, index) => {
    setCurrentOrder(order);
   
  };

  const removeAllOrders = () => {
    const serviceCall = () => {
      return OrderDataService.removeAll().then((response) => {
        refreshList();
      });
    };
    AuthService.refreshTokenWrapperFunction(serviceCall);
  };

  const findByOrderNumber = () => {
    const serviceCall = () => {
      return OrderDataService.findByOrderNumber(searchTitle).then(
        (response) => {
          if ("error" in response.data) {
            setErrorMessage(response.data.error);
          } else {
            console.log("found", response.data);
            setOrders(response.data.orders);
          }
        }
      );
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      console.log(e);
    }
  };

  const clearSearch = () => {
    refreshList();
    setSearchTitle("");
    setErrorMessage("");
  };

 

  //let ordersToDisplay = [];
 // sortedOrders ? (ordersToDisplay = sortedOrders) : (ordersToDisplay = orders);

  const orderTbody = (
    <div className={styles.flagContainer}>
      {orders &&
        orders.map((order, index) => (
          <>
          <div
            className={styles.flagItem}
            onClick={() => setActiveOrder(order, index)}
            key={index}
          >
            <p className={styles.orderNum}>{order.order_number}</p>
            <p className={styles.officeCode}>{order.home_office_code}</p>
            <div className={styles.statusGroup}>
              <p className={styles.description}>{order.status.description}</p>
            </div>
            
          </div>
          <div className={styles.mobileStatus}> 
            {currentOrder ?(
            
              <div>
                <p>Created on: {currentOrder.created_at}</p>
                <p>Last Updated: {currentOrder.updated_at}</p>

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
              </div>  ):(
              <div>
                
              </div>
            )}
          </div>
          
          
          </>
        ))}
    </div>
  );

  const closePopUpBox = () => {
    setPopUpbox("none");
  };

  
    return (
      <>
        
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
          <h4>Orders List</h4>

          <div className={styles.orderContainer}>
            
             {orderTbody}

             <div className={styles.statusContainer}>
            {currentOrder ? (
              <div className={styles.statusItemContainer}>
                <p>Order: {currentOrder.order_number}</p>
                 <p>Created on: {currentOrder.created_at}</p>
                <p>Last Updated: {currentOrder.updated_at}</p>

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
          
          
        

        <div className="pop-container" style={{ display: popUpBox }}>
          <div className="pop-up" onClick={closePopUpBox}>
            <h3>{errorMessage}</h3>
          </div>
        </div>
      </>
    );
};

export default OrdersList;
