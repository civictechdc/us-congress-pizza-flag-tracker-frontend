import { useState } from "react";
import { SortArrows } from "./sorting/sortArrows";
import styles from "../style/sort.module.css";

export const TableHeader = (props) => {
  const [sortControl, setSortControl] = useState("none");

  const { sortedField, sortDir, setSortedField, setSortDir, setSortType } =
    props;

  const handleSortClick = (e) => {
    setSortedField(e.target.getAttribute("col"));
    setSortDir(e.target.getAttribute("direction"));
    setSortType(e.target.getAttribute("sorttype"));
  };

  const displaySort = () => {
    if (sortControl === "none") {
      setSortControl("flex");
    } else {
      setSortControl("none");
    }
  };

  return (
    <>
      <div className={styles.sortContainer}>
        <button className={styles.sortBox1} onClick={displaySort}>
          Sort By
        </button>
        <div className={styles.sortBox2} style={{ display: sortControl }}>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>Order: </div>
            <SortArrows
              col="order_number"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>State: </div>
            <SortArrows
              col="usa_state"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>Office: </div>
            <SortArrows
              col="home_office_code"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>Status: </div>
            <SortArrows
              col="order_status_id"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>Created: </div>
            <SortArrows
              col="created_at"
              handleClick={handleSortClick}
              sorttype="date"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
          <div className={styles.sortItem}>
            <div className={styles.sortTitle}>Updated: </div>
            <SortArrows
              col="updated_at"
              handleClick={handleSortClick}
              sorttype="date"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          </div>
        </div>
      </div>
    </>
  );
};

/*
Have the button collapse and expand with an arrow.
Arrows can be changed in sortArrow.js
*/
