import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";
import { Link } from "react-router-dom";
import styles from "../style/orders.module.css";
import AuthService from "../service/authService";
import { useSortableData } from "./sorting/sortHook";
import { TableHeader } from "./tableHeader";
import Gauge from "./gauge";
import { Search } from "./search";
import { editOrderControl } from "./protectedRoute/permissions";
import { useHistory, useLocation } from "react-router-dom";
import UserContext from "./userContext";
import PopUpBoxComponent from "./popUpBoxComponent";

const OrdersView = () => {
  const initialSearchState = { keyword: "", status: [], state: "", office: "" };

  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [popUpBox, setPopUpBox] = useState("none");
  const [message, setMessage] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [sortType, setSortType] = useState("numeric");
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const { setUserDisplay } = useContext(UserContext);
  const history = useHistory();

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
    const serviceToExecute = async () => {
      const response = await OrderDataService.getAll(params);
      setOrders(response.data.orders);
      setLoading(false);
    };
    return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
      setPopUpBox("block");
      setMessage("Order Issue: " + err);
    });
  };

  // in production replace demologin code with this:
  // const searchParams = useLocation().search;

  //demologin code begin
  const rawParams = useLocation().search;
  const paramsArray = rawParams.split("/demoLogin?q=");
  const searchParams = paramsArray[0];
  const userName = paramsArray[1];

  const logIn = async (userName, password) => {
    const response = await AuthService.login(userName, password);
    if (response.message) {
      setMessage("Issue: " + response.message);
    } else {
      setMessage("Login Updated, click this box to continue");
    }
    setPopUpBox("block");
  };

  if (userName != undefined) {
    const password = userName + "-1010";
    logIn(userName, password);
    history.push("/" + searchParams);
  }
  //demologin code end

  useEffect(() => {
    setLoading(true);
    try {
      dispatch({ type: "state", payload: "Search by State" });
      dispatch({ type: "office", payload: "Search by Office" });
      dispatch({ type: "keyword", payload: "" });
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
    history.push("/");
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
      StatusDataService.retrieveStatuses(setStatuses).catch((err) => {
        setMessage("Status Issue: " + err);
        setPopUpBox("block");
      });
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
                {currentOrder ? ( // checks for null value
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
    setUserDisplay();
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h4 className={styles.title}>Orders</h4>
        <Search
          searchState={searchState}
          statuses={statuses}
          searchParams={searchParams}
          clearSearch={clearSearch}
        />
        {ordersToDisplay.length ? (
          <>
            <TableHeader
              sortedField={sortedField}
              sortDir={sortDir}
              setSortedField={setSortedField}
              setSortType={setSortType}
              setSortDir={setSortDir}
            />
            <div className={styles.statusItem}>
              <h5> Please click on an order... </h5>
            </div>
          </>
        ) : (
          <div className={styles.mainContainer}>
            <h4 className={styles.title}>No orders found</h4>
          </div>
        )}
        <div className={styles.orderContainer}>
          {orderTbody}

          <div className={styles.statusItemContainer}></div>
        </div>
      </div>
      <PopUpBoxComponent
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default OrdersView;
