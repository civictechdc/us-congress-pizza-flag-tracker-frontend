import { useState } from "react";
import { SortArrows } from "./Sort/SortArrows";
import styles from "../style/sort.module.css"

export const TableHeader = (props) => {

  const [sortControl, setSortControl] = useState('none')



  const { sortedField, sortDir, setSortedField, setSortDir, setSortType } =
    props;

  const handleSortClick = (e) => {
    setSortedField(e.target.getAttribute("col"));
    setSortDir(e.target.getAttribute("direction"));
    setSortType(e.target.getAttribute("sorttype"));
  };

  const displaySort = () => {

    if(sortControl === 'none'){
      setSortControl('flex')
    }else{
      setSortControl('none')
    }
    
  }

  return (
   <> 
    <div className={styles.sortContainer}>  
      <div className={styles.sortBox1} onClick={displaySort}>
        Sort By
      </div>
      <div className={styles.sortBox2} style={{ display: sortControl }}>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
            Order Number
          </div>
          
          <SortArrows
              col="order_number"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
          />
          
        </div>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
          USA State
          </div>
            <SortArrows
              col="usa_state"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          
        </div>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
          Congressional Office
          </div>
          
            <SortArrows
              col="home_office_code"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          
        </div>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
          Order Status
          </div>
            <SortArrows
              col="order_status_id"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          
        </div>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
          Date created
          </div>
            <SortArrows
              col="created_at"
              handleClick={handleSortClick}
              sorttype="date"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          
        </div>
        <div className={styles.sortItem}>
          <div className={styles.sortTitle}>
          Date updated
          </div>
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
