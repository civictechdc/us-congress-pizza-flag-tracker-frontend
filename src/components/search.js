import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "../style/orders.module.css";
import { STATES } from "./states";
import verticalLine from "./images/verticalLine.png"

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

  // const resetOrderNumber = () => {
  //   setBasicSearchValue('');
  // }

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

  const onResetSearchTitle = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("keyword");
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
    <>
      <div className={styles.outerSearchContainer}>
        <div className={styles.innerSearchContainer}>
          <div className={styles.searchComponent}>
            <label htmlFor="orderNumber">Search by order number</label>
            <input
              id="orderNumber"
              type="number"
              className={styles.inputOrderContainer}
              min="1"
              onChange={onChangeOrderNumber}
              placeholder="Search by order number"
              value={searchState?.order_number}
            />
            {/* {basicSearchValue && <XIcon className={styles.XIcon + ' ' + styles.XIcon1} onClick={resetOrderNumber} />} */}
            <img
              className={styles.verticalLine}
              src={verticalLine}
              alt={"Vertical Line"}
            />
          </div>
        </div>
        <div className={styles.innerSearchContainer}>
          <div className={styles.searchComponent}>
            <label htmlFor="keyword">Search by keyword</label>
            <input
              id="keyword"
              type="text"
              className={styles.inputOrderContainer}
              onChange={onChangeSearchTitle}
              placeholder="Search by keyword"
              value={searchState?.keyword}
            />
            {/* {searchState.keyword && <XIcon className={styles.XIcon + ' ' + styles.XIcon2} onClick={onResetSearchTitle} />}   */}
          </div>
        </div>
        <div className={styles.innerSearchContainer}>
          <div className={styles.searchComponent}>
            <label htmlFor="status">Search by status</label>
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
        </div>
        <div className={styles.innerSearchContainer}>
          <div className={styles.searchComponent}>
            <label htmlFor="state">Search by State</label>
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
          </div>
        </div>
        <div className={styles.innerSearchContainer}>
          <div className={styles.searchComponent}>
            <label htmlFor="office">Search by Office</label>
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
          </div>
        </div>a
      </div>
      {searchParams ? (
        <button className={styles.clearButton} onClick={emptySearch}>
          Clear
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
