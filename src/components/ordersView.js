import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import debounce from 'lodash.debounce';

import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";
import StatusDataService from "../service/statusService";

import { editOrderControl } from "./permissions";
import Gauge from "./gauge";
import PopUpBoxComponent from "./popUpBoxComponent";
import { Search } from "./search";
import { TableHeader } from "./tableHeader";
import UserContext from "./userContext";
import { useSortableData } from "./sorting/sortHook";
import verticalLine from "./images/verticalLine.png"
import downArrow from "./images/downArrow-14by9.png"
import upArrow from "./images/upArrow-14by9.png"

import styles from "../style/orders.module.css";

const OrdersView = () => {
  const initialSearchState = { order_number: "", keyword: "", status: [], state: "", office: "" };

  const [orders, setOrders] = useState([]);
  const [popUpBox, setPopUpBox] = useState("none");
  const [message, setMessage] = useState("");
  const [sortedField, setSortedField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [sortType, setSortType] = useState("numeric");
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [mediaQuery, setMediaQuery] = useState(window.innerWidth);
  const [searchMode, setSearchMode] = useState("off");
  const { setUserDisplay } = useContext(UserContext);
  const sortOptions = { sortedField, sortDir, sortType };
  const sortedOrders = useSortableData(orders, sortOptions);
  const navigate = useNavigate();

  useEffect(() => {
    if (statuses.length === 0) {
      StatusDataService.retrieveStatuses(setStatuses).catch((err) => {
        setMessage("Status Issue: " + err);
        setPopUpBox("block");
      });
    }
  }, [statuses]);

  const statusOptions = statuses.map((status) => ({
    value: status.status_code,
    label: status.status_code,
    name: "status_code",
  }));

  const [statusSelected, setStatusSelected] = useState(statusOptions[0]);

  useEffect(() => {
    const handleWindowResize = () => {
      setMediaQuery(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const searchStateReducer = (searchState, action) => {
    switch (action.type) {
      case "order_number":
        return { ...searchState, order_number: action.payload };
      case "keyword":
        return { ...searchState, keyword: action.payload };
      case "state":
        return { ...searchState, state: action.payload };
      case "status":
        //eslint-disable-next-line
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

  const debouncedRetrieveOrders = useMemo(
    () => debounce(retrieveOrders, 500)
  , []);

  useEffect(() => {
    return () => {
      debouncedRetrieveOrders.cancel();
    }
  }, [debouncedRetrieveOrders]);

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
      dispatch({ type: "order_number", payload: "" });
      dispatch({ type: "keyword", payload: "" });
      dispatch({ type: "state", payload: "Search by State" });
      dispatch({ type: "office", payload: "Search by Office" });
      if (searchParams) {
        debouncedRetrieveOrders(searchParams);
        const parsedParams = new URLSearchParams(searchParams);
        parsedParams.forEach((value, propName) => {
          dispatch({ type: propName, payload: value });
        });
      } else {
        debouncedRetrieveOrders();
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedRetrieveOrders, searchParams, dispatch]);

  const setActiveOrder = (order) => {
    navigate("/scan/" + order.uuid);
  };

  const clearSearch = () => {
    setStatusSelected('');
    retrieveOrders();
    navigate("/");
  };

  const toggleSearchMode = () => {
    (searchMode == "off") ? setSearchMode("on") : setSearchMode("off") ;
  }

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
                onClick={() => setActiveOrder(order)}
                key={index}
              >
                <div className={styles.flagItemUpper}>                
                  <p className={styles.orderNum} data-order-number={order.order_number}>{order.order_number}</p>
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
        {(mediaQuery < 801) ? (
          <>
            <div style={{backgroundColor:"#000", height:"1px", width:"100%"}} />
            <div className={styles.searchToggleContainer}>
              <h5 className={styles.searchToggle}>Search Controls</h5>
              <img
                className={styles.verticalLineToggle}
                src={verticalLine}
                alt={"Vertical Line"}
              />
              {(searchMode == "off") ? (
                <img
                  className={styles.arrowToggle}
                  src={downArrow}
                  alt={"Down Arrow"}
                  onClick={toggleSearchMode}
                />
              ) : (
                <img
                  className={styles.arrowToggle}
                  src={upArrow}
                  alt={"Up Arrow"}
                  onClick={toggleSearchMode}
                />
              )}
            </div>
            {(searchMode == "off") ? (
              <>
                <div style={{backgroundColor:"#000", height:"1px", width:"100%"}} />
                {ordersToDisplay?.length ? (
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
                  <h4 className={styles.subtitle}>No orders found</h4>
                )}
                <div className={styles.orderContainer}>
                  {orderTbody}
                </div>
              </>
            ) : (
              <Search
                mediaQuery={mediaQuery}
                searchState={searchState}
                statusOptions={statusOptions}
                statusSelected={statusSelected}
                setStatusSelected={setStatusSelected}
                searchParams={searchParams}
                toggleSearchMode={toggleSearchMode}
                clearSearch={clearSearch}
              /> 
            )}
          </>
        ) : (     // mediaQuery >= 801
          <>
            <Search
              mediaQuery={mediaQuery}
              searchState={searchState}
              statusOptions={statusOptions}
              statusSelected={statusSelected}
              setStatusSelected={setStatusSelected}
              searchParams={searchParams}
              toggleSearchMode={toggleSearchMode}
              clearSearch={clearSearch}
            />
            <div className={styles.sortAndResultsContainer}>      
              {ordersToDisplay?.length ? (
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
                <h4 className={styles.subtitle}>No orders found</h4>
              )}
              <div className={styles.orderContainer}>
                {orderTbody}
              </div>
            </div>
          </>
        )}
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
