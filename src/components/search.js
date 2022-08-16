import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { XIcon } from '@heroicons/react/solid';
import styles from "../style/orders.module.css";
import { STATES } from "./states";
import verticalLine from "./images/verticalLine.png"

export const Search = (props) => {
  const { searchState, statuses, searchParams, clearSearch, searchMode, setSearchMode, basicSearchValue, setBasicSearchValue} = props;
  const navigate = useNavigate();
 
  const statusOptions = statuses.map((status) => ({
    value: status.status_code,
    label: status.status_code,
    name: "status_code",
  }));

  const [statusSelected, setStatusSelected] = useState(statusOptions[0]);
  const inputOrderNumber = useRef(null);

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

  const onChangeOrderNumber = (e) => {
    setBasicSearchValue(e.target.value);
  }

  const resetOrderNumber = () => {
    setBasicSearchValue('');
  }

  const emptySearch = () => {
    clearSearch();
    setStatusSelected(null);
    setBasicSearchValue(null);
    document.getElementById('orderNumber').value = '';
  };

  const changeMode = () => {
    (searchMode == "basic") ? setSearchMode("advanced") : setSearchMode("basic");
    emptySearch();
  }

  return (
    <>
      {(searchMode == "basic") ? (
        <div className={styles.outerInputContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.searchComponent}>
            <label htmlFor="orderNumber">Search by order number</label>
            <input
              id="orderNumber"
              ref={inputOrderNumber}
              type="number"
              className={styles.inputOrderContainer}
              placeholder="Search by order number"
              onChange={onChangeOrderNumber}
              min="1"
              value={basicSearchValue}
            />
            {basicSearchValue && <XIcon className={styles.XIcon} onClick={resetOrderNumber} />}
            <img
                className={styles.verticalLine}
                src={verticalLine}
                alt={"Vertical Line"}
              />
            </div>
            <button className={styles.modeButton} onClick={changeMode}>Go Adv Search</button>
          </div>
        </div> 
      ) : (
        <div className={styles.outerInputContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.searchComponent}>
              <label htmlFor="keyword">Search by keyword</label>
              <input
                id="keyword"
                type="text"
                className={styles.inputOrderContainer}
                placeholder="Search by keyword"
                value={searchState?.keyword}
                onChange={onChangeSearchTitle}
              />
            </div>
            <button className={styles.modeButton} onClick={changeMode}>Go Basic Search</button>
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
                value={statusSelected}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.searchComponent}>
              <label htmlFor="state">Search by state</label>
              <Select
                id="state"
                options={stateOptions}
                className={styles.subSelect}
                onChange={onChangeParams}
                placeholder={"Search by state"}
                value={{
                  label: searchState?.state,
                  name: "usa_state",
                  value: searchState?.state,
                }}
              />
            </div>
            <div className={styles.searchComponent}>
              <label htmlFor="office">Search by office</label>
                <Select
                  id="office"
                  options={officeOptions}
                  className={styles.subSelect}
                  onChange={onChangeParams}
                  placeholder="Search by office"
                  value={{
                    label: searchState?.office,
                    name: "usa_state",
                    value: searchState?.office,
                  }}
                />
            </div>
          </div>
        </div>
      )}
      {(searchParams || basicSearchValue) ? (
        <button className={styles.clearButton} onClick={emptySearch}>
          Clear
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

/*
https://stackoverflow.com/questions/70760006/x-clear-icon-appears-only-when-the-input-has-value-react
XIcon
https://github.com/tailwindlabs/heroicons
*/