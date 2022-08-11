import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";

import styles from "../style/orders.module.css";
import AuthService from "../service/authService";
import { useSortableData } from "./sorting/sortHook";
import { TableHeader } from "./tableHeader";
import Gauge from "./gauge";
import { Search } from "./search";
import { editOrderControl } from "./permissions";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [searchMode, setSearchMode] = useState("basic");
  const { setUserDisplay } = useContext(UserContext);
  const navigate = useNavigate();

  const sortOptions = { sortedField, sortDir, sortType };
  const sortedOrders = useSortableData(orders, sortOptions);
  const searchStateReducer = (searchState, action) => {
    switch (action.type) {
      case "keyword":
        return { ...searchState, keyword: action.payload };
      case "state":
        return { ...searchState, state: action.payload };
      case "status":
        const statusArray = [...searchState?.status ?? [], action?.payload]; // https://www.angularfix.com/2021/12/typeerror-intermediate.html
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

  let searchParams = useLocation().search;

  if (searchState === undefined) {
    navigate("/");                                                
    searchParams = "";                                            
  }

  //////////////////////////////////////////
  /* in production remove demologin code: */
  //////////////////////////////////////////

  //demologin code begin
  const rawParams = useLocation().search;

  let countParams = 0; 
  const queryCharacter = "?";
  rawParams
    .split("")
    .forEach((x) => (x == queryCharacter ? countParams++ : null));
  
  const demoLoginBugCheck = rawParams.includes("/demoLogin?q=");

  if (countParams == 2 && demoLoginBugCheck == true) {            // Legit use case, you may pass
    const paramsArray = rawParams.split("/demoLogin?q=");
    searchParams = paramsArray[0];
    const userName = paramsArray[1];

    const logIn = async (userName, password) => {
      const response = await AuthService.login(userName, password).then((response) => {
        setMessage("Login Updated, click this box to continue");
      }).catch((err) => {
        setMessage("Issue: " + err);
      });
      setPopUpBox("block");
    };

    if (userName != undefined) {
      const password = userName + "-1010";
      logIn(userName, password);
      navigate("/" + searchParams);
    }
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

  const setActiveOrder = (order) => {
    navigate("/scan/" + order.uuid);
  };

  const clearSearch = () => {
    refreshList();
    navigate("/");
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

  const changeMode = () => {
    (searchMode == "basic") ? setSearchMode("advanced") : setSearchMode("basic"); 
  }

  console.log("Mode Change: ", searchMode);

  const orderTbody = (
    <div className={styles.flagContainer}>
      {loading
        ? "Loading..."
        : ordersToDisplay &&
          ordersToDisplay.map((order, index) => (
            <>
              <div
                className={styles.flagItem}
                onClick={() => setActiveOrder(order)}
                key={index}
              >
                <div className={styles.flagItemUpper}>                
                  <p className={styles.orderNum}>{order.order_number}</p>
                  <div className={styles.infoBox}>
                    <p className={styles.officeCode}>{order.home_office_code}</p>
                    <p className={styles.constituentName}>{order.person.name}</p>
                    <p className={styles.basicInfo}>
                      {order.person.phone}
                    </p>
                  </div>
                  <div className={styles.infoBox}>
                    <p className={styles.officeCodeSpacing}>Spacing</p>
                    <p className={styles.basicInfo}>
                      <b>Created:</b> {formatDate(order.created_at)}
                    </p>
                    <p className={styles.basicInfo}>
                      <b>Updated:</b> {formatDate(order.updated_at)}
                    </p>
                  </div>
                </div> 
                <div className={styles.gaugeContainer}>
                  <p className={styles.description}>
                    {order.status.description}
                  </p>
                  <Gauge
                    status={order.status.sequence_num}
                    statuses={statuses}
                  />
                </div>
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
          searchMode={searchMode}
          changeMode={changeMode}
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
