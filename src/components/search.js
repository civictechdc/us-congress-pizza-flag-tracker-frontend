import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import styles from "../style/orders.module.css";
import { STATES } from "./states";

export const Search = (props) => {
  const { searchState, statuses, searchParams, clearSearch, searchMode, changeMode } = props;
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

  function onChangeSearchTitle(e) {
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

  const emptySearch = () => {
    clearSearch();
    setStatusSelected(null);
  };

  return (
    <>
      {(searchMode == "basic") ? (
        <button onClick={changeMode}>Go Advanced Search</button>


      ) : (
        <div className={styles.outerInputContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.searchComponent}>
              <label htmlFor="keyword">Search by order number or keyword</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by order number or keyword"
                value={searchState?.keyword}
                onChange={onChangeSearchTitle}
                id="keyword"
              />
            </div>
            <button onClick={changeMode}>Go Basic Search</button>
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
