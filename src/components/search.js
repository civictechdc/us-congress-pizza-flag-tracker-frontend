import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "../style/orders.module.css";
import { STATES } from "./states";
import verticalLine from "./images/verticalLine.png"
import xIcon from "./images/x-12by13.png"

export const Search = (props) => {
  const { searchState, statuses, searchParams, clearSearch } = props;
  const navigate = useNavigate();
 
  const statusOptions = statuses.map((status) => ({
    value: status.status_code,
    label: status.status_code,
    name: "status_code",
  }));

  const [statusSelected, setStatusSelected] = useState(statusOptions[0]);

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
  {
    if (searchState?.state?.length === 2) {
      let selectedState = JSON.parse(JSON.stringify(STATES));
      selectedState = selectedState.filter(
        (state) => state.name === searchState.state
      );
      officeOptions = selectedState.map((state) => state.districts);
    } else officeOptions = STATES.map((state) => state.districts);
  }
  officeOptions = officeOptions
    .flat()
    .map((office) => ({ label: office, value: office, name: "office" }));
  officeOptions.unshift({ value: null, label: "None", name: "office" });

  const onChangeOrderNumber = (e) => {
    const searchOrderNumber = e.target.value;
    const queryParams = new URLSearchParams(window.location.search);
    if (searchOrderNumber == null) {
      queryParams.delete("order_number");
    } else {
      queryParams.set("order_number", searchOrderNumber);
    }
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  }

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    const queryParams = new URLSearchParams(window.location.search);
    if (searchTitle == null) {
      queryParams.delete("keyword");
    } else {
      queryParams.set("keyword", searchTitle);
    }
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  }

  const onChangeParams = (e) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (e.value == null) {
      queryParams.delete(e.name);
    } else {
      queryParams.set(e.name, e.value);
      if (e.name === "state" && queryParams.get("office") != null) {
        queryParams.delete("office");
      }
    }
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const onReset = (x) => {
    const e = ({
      value: null,
      name: x.target.attributes.id.value,
    });
    onChangeParams(e);
  }

  const onChangeMultiParams = (e) => {
    setStatusSelected(e);
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
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const emptySearch = () => {
    clearSearch();
    setStatusSelected('');
  };

  return (
    <div className={styles.outerSearchContainer}>
      <div className={styles.middleSearchContainer}>  
        <div className={styles.innerSearchContainer}>
          <label className={styles.innerSearchLabel} htmlFor="orderNumber">Order Number</label>
          <input
            id="orderNumber"
            type="number"
            className={styles.inputOrderContainer}
            min="1"
            onChange={onChangeOrderNumber}
            placeholder="Search by order number"
            value={searchState?.order_number}
          />
          {searchState?.order_number && 
            <img
              id="order_number"
              className={styles.xIcon}
              src={xIcon}
              alt={"X Icon"}
              onClick={onReset}
            />
          }
          <img
            className={styles.verticalLineInput}
            src={verticalLine}
            alt={"Vertical Line"}
          />
        </div>
        <div className={styles.innerSearchContainer}>
          <label className={styles.innerSearchLabel} htmlFor="keyword">Keyword</label>
          <input
            id="keyword"
            type="text"
            className={styles.inputOrderContainer}
            onChange={onChangeSearchTitle}
            placeholder="Search by keyword"
            value={searchState?.keyword}
          />
          {searchState?.keyword && 
            <img
              id="keyword"
              className={styles.xIcon}
              src={xIcon}
              alt={"X Icon"}
              onClick={onReset}
            />
          }
          <img
            className={styles.verticalLineInput}
            src={verticalLine}
            alt={"Vertical Line"}
          />
          <img
            className={styles.horizontalLineInput}
            src={verticalLine}
            alt={"Horizontal Line"}
          /> 
        </div>
        <div className={styles.innerSearchContainer}>
          <label className={styles.innerSearchLabel} htmlFor="state">State</label>
          <Select
            id="state"
            className={styles.subSelect}
            onChange={onChangeParams}
            options={stateOptions}
            placeholder={"Search by State"}
            value={{
              label: searchState?.state,
              name: "usa_state",
              value: searchState?.state,
            }}
          />
          {(searchState?.state !== "Search by State") && 
            <img
              id="state"
              className={styles.xIcon}
              src={xIcon}
              alt={"X Icon"}
              onClick={onReset}
            />
          } 
        </div>
        <div className={styles.innerSearchContainer}>
          <label className={styles.innerSearchLabel} htmlFor="office">Office</label>
          <Select
            id="office"
            className={styles.subSelect}
            onChange={onChangeParams}
            options={officeOptions}
            placeholder="Search by Office"
            value={{
              label: searchState?.office,
              name: "usa_state",
              value: searchState?.office,
            }}
          />
          {(searchState?.office !== "Search by Office") && 
            <img
              id="office"
              className={styles.xIcon}
              src={xIcon}
              alt={"X Icon"}
              onClick={onReset}
            />
          } 
        </div>
        <div className={styles.innerSearchContainer}>
          <label className={styles.innerSearchLabel} htmlFor="status">Status</label>
          <Select
            id="status"
            className={styles.subSelect}
            isMulti={true}
            label="Search by status"
            onChange={onChangeMultiParams}
            options={statusOptions}
            placeholder="Search by status"
            value={statusSelected}
          />       
        </div>
        <div className={styles.clearContainer} >
          {searchParams ? (
            <button className={styles.clearButton} onClick={emptySearch}>
              Clear
            </button>
          ) : (
            <button className={styles.clearButtonHidden} onClick={emptySearch}>
            Clear
          </button>
          )}
        </div>
      </div>
    </div>
  );
};
