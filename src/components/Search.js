import { React } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import styles from "../style/orders.module.css";
import OrderDataService from "../service/orderService";
import { STATES } from "../components/states";

export const Search = (props) => {
  const { searchState, setSearchTitle, statuses } = props;
  const history = useHistory();

  const statusOptions = statuses.map((status) => ({
    value: status.id,
    label: status.status_code,
    name: "status_code",
  }));
  statusOptions.unshift({ value: null, label: "None", name: "status" });

  let stateOptions = [];
  if (STATES) {
    stateOptions = STATES.map((state) => ({
      label: state.name,
      value: state.name,
      name: "state",
    }));
  }
  stateOptions.unshift({ value: null, label: "None", name: "state" });

  let officeOptions = [];
  officeOptions = STATES.map((state) => state.districts);
  officeOptions = officeOptions
    .flat()
    .map((office) => ({ label: office, value: office, name: "office" }));
  officeOptions.unshift({ value: null, label: "None", name: "office" });

  function onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    const queryParams = new URLSearchParams(window.location.search);
    if (searchTitle == null) {
      queryParams.delete("keyword");
    } else {
      queryParams.set("keyword", searchTitle);
    }
    history.replace(`${window.location.pathname}?${queryParams.toString()}`);
  }

  const onChangeParams = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log("e: ", e);
    if (e.value == null) {
      queryParams.delete(e.name);
    } else {
      queryParams.set(e.name, e.value);
    }
    history.replace(`${window.location.pathname}?${queryParams.toString()}`);
  };

  const onChangeMultiParams = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    let statusArray = [];
    if (!e.length) {
      queryParams.delete("status");
    } else {
      for (let value of e) {
        statusArray.push(value.value);
      }
      queryParams.set("status", statusArray.join());
    }

    history.replace(`${window.location.pathname}?${queryParams.toString()}`);
  };

  /* This is now unused as we will replace it with the generic findByKeyword I believe */
  // const findByOrderNumber = () => {
  //   let serviceCall = () => {
  //     //changed from const to let to maintain best practices
  //     return OrderDataService.findByOrderNumber(searchTitle).then(
  //       (response) => {
  //         if ("error" in response.data) {
  //           setErrorMessage(response.data.error);
  //         } else {
  //           console.log("found", response.data);
  //           setOrders(response.data.orders);
  //         }
  //         setLoading(false);
  //       }
  //     );
  //   };
  //   try {
  //     setLoading(true);
  //     AuthService.refreshTokenWrapperFunction(serviceCall);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  console.log(searchState);

  return (
    <div className={styles.outerInputContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.searchComponent}>
          <label htmlFor="keyword">Search by order number or keyword</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by order number or keyword"
            value={searchState.keyword}
            onChange={onChangeSearchTitle}
            id="keyword"
          />
          {/* <div className={styles.searchButton}>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByOrderNumber}
          >
            Search
          </button>
          </div> */}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.searchComponent}>
          <label htmlFor="status">Search by status</label>
          <Select
            id="status"
            options={statusOptions}
            className={styles.subSelect}
            onChange={onChangeMultiParams}
            isMulti={true}
            placeholder="Search by status"
            label="Search by status"
          ></Select>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.searchComponent}>
          <label htmlFor="state">Search by state</label>
          <Select
            options={stateOptions}
            className={styles.subSelect}
            onChange={onChangeParams}
            placeholder={"Search by state"}
            // value={searchState.state}
            value={{
              label: searchState.state,
              name: "usa_state",
              value: searchState.state,
            }}
          ></Select>
        </div>
        <div className={styles.searchComponent}>
          <label htmlFor="office">Search by office</label>
          <Select
            options={officeOptions}
            className={styles.subSelect}
            onChange={onChangeParams}
            placeholder="Search by office"
            // value={searchState.office}
            value={{
              label: searchState.office,
              name: "usa_state",
              value: searchState.office,
            }}
          ></Select>
        </div>
      </div>
    </div>
  );
};
