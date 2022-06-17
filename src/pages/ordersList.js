import React, { useState, useEffect, useReducer, useRef } from "react";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";
import { Link } from "react-router-dom";
import styles from "../style/orders.module.css";
import AuthService from "../service/authService";
import { useSortableData } from "../components/sorting/sortHook";
import { TableHeader } from "../components/tableHeader";
import Gauge from "../components/gauge";
import { Search } from "../components/Search";
import { editOrderControl } from "../components/protectedRoute/permissions";
import { useLocation } from "react-router-dom";

const OrdersList = () => {
  let initialSearchState = { keyword: "", status: [], state: "", office: "" };
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchTitle, setSearchTitle] = useState(initialSearchState.keyword);
  const [popUpBox, setPopUpBox] = useState("none");
  const [errorMessage, setErrorMessage] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [sortType, setSortType] = useState("numeric");
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);

  const sortOptions = { sortedField, sortDir, sortType };
  const sortedOrders = useSortableData(orders, sortOptions);
  const searchStateReducer = (searchState, action) => {
    switch (action.type) {
      case "keyword":
        return { ...searchState, keyword: action.payload };
      case "state":
        return { ...searchState, state: action.payload };
      case "status":
        const statusArray = [...searchState.status, action.payload];
        return { ...searchState, status: statusArray };
      case "office":
        return { ...searchState, office: action.payload };
      default:
        return;
    }
  };
  const [searchState, dispatch] = useReducer(
    searchStateReducer,
    initialSearchState
  );

  //retrieve orders based on authorization level
  const retrieveOrders = (params) => {
    let serviceCall = () => {
      return OrderDataService.getAll(params).then((response) => {
        setOrders(response.data.orders);
        setLoading(false);
      });
    };
    try {
      AuthService.refreshTokenWrapperFunction(serviceCall);
    } catch (e) {
      setErrorMessage(e.message);
      setPopUpBox("block");
    }
  };
  const searchParams = useLocation().search;
  useEffect(() => {
    setLoading(true);
    try {
      dispatch({ type: "state", payload: "Search by State" });
      dispatch({ type: "office", payload: "Search by Office" });
      if (searchParams) {
        retrieveOrders(searchParams);
        const parsedParams = new URLSearchParams(searchParams);
        parsedParams.forEach((value, propName) => {
          dispatch({ type: propName, payload: value });
        });
      } else {
        retrieveOrders();
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams, dispatch]);

  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
  };

  const setActiveOrder = (order, index) => {
    if (
      currentOrder == null ||
      currentOrder.order_number !== order.order_number
    ) {
      setCurrentOrder(order, index);
    } else {
      setCurrentOrder(null);
    }
  };

  const clearSearch = () => {
    refreshList();
    setSearchTitle("");
    setErrorMessage("");
  };

  const formatDate = (dateString) => {
    /*https://github.com/w3c/respec/issues/1357#issuecomment-760913749 
    and also remove the fractional seconds as was required */
    const safariFix = dateString.replace(/-/g, "/").replace(/\..*/, "");
    // console.log(dateString, safariFix, new Date(Date.parse(safariFix)))
    return dateString !== "" && dateString !== null
      ? Intl.DateTimeFormat("en-US").format(Date.parse(safariFix))
      : "";
  };

  let ordersToDisplay = [];
  sortedOrders ? (ordersToDisplay = sortedOrders) : (ordersToDisplay = orders);

  useEffect(() => {
    if (statuses.length === 0) {
      StatusDataService.retrieveStatuses(
        setErrorMessage,
        setStatuses,
        setPopUpBox
      );
    }
  }, [statuses]);

  const isEditor = useRef("");
  useEffect(() => {
    editOrderControl() ? (isEditor.current = "yes") : (isEditor.current = "");
  }, [isEditor]);

  const orderTbody = (
    <div className={styles.flagContainer}>
      {loading
        ? "Loading..."
        : ordersToDisplay &&
          ordersToDisplay.map((order, index) => (
            <>
              <div
                className={styles.flagItem}
                onClick={() => setActiveOrder(order, index)}
                key={index}
              >
                <p className={styles.orderNum}>{order.order_number}</p>
                <div className={styles.constituentBox}>
                  <p className={styles.officeCode}>{order.home_office_code}</p>
                  <p className={styles.constituentName}>{order.person.name}</p>
                  <p className={styles.constituentPhone}>
                    {order.person.phone}
                  </p>
                </div>
                <div className={styles.gaugeContainer}>
                  <Gauge
                    status={order.status.sequence_num}
                    statuses={statuses}
                  />
                </div>
              </div>
              <div>
                {currentOrder ? ( // checks for null values
                  currentOrder.order_number == order.order_number ? (
                    <div className={styles.mobileStatus}>
                      <div className={styles.statusItem}>
                        <p className={styles.description}>
                          {currentOrder.status.description}
                        </p>
                      </div>
                      <div className={styles.statusItem}>
                        <p>
                          <b>Created:</b> {formatDate(currentOrder.created_at)}
                        </p>
                        <p>
                          <b>Updated:</b> {formatDate(currentOrder.updated_at)}
                        </p>
                      </div>
                      <div className={styles.statusItem}>
                        {isEditor.current ? (
                          <Link
                            to={"/orders/" + currentOrder.uuid}
                            className={styles.orderLinks}
                          >
                            Edit
                          </Link>
                        ) : (
                          <></>
                        )}
                        <Link
                          to={{
                            pathname: "/scan/" + currentOrder.uuid,
                            state: {
                              orderOfficeCheck: currentOrder.home_office_code,
                            },
                          }} // sends order office to route for checking
                          className={styles.orderLinks}
                        >
                          Scan
                        </Link>
                        <Link
                          to={"/print/" + currentOrder.uuid}
                          className={styles.orderLinks}
                        >
                          Print
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: 0 }}></div>
                  )
                ) : (
                  <div style={{ borderTop: "none" }}></div>
                )}
              </div>
            </>
          ))}
    </div>
  );

  const closePopUpBox = () => {
    setPopUpBox("none");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h4 className={styles.title}>Orders</h4>
        <Search
          searchState={searchState}
          setSearchTitle={setSearchTitle}
          statuses={statuses}
        />
        <TableHeader
          sortedField={sortedField}
          sortDir={sortDir}
          setSortedField={setSortedField}
          setSortType={setSortType}
          setSortDir={setSortDir}
        />

        <div className={styles.orderContainer}>
          {orderTbody}

          <div className={styles.statusItemContainer}></div>
        </div>

        {errorMessage || searchTitle ? (
          <button className="m-3 btn btn-sm btn-danger" onClick={clearSearch}>
            Clear search
          </button>
        ) : (
          <div className={styles.statusItem}>
            <p>
              Please click
              <br /> on an order...
            </p>
          </div>
        )}
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
