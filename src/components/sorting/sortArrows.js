import styles from "../../style/sort.module.css";

export const SortArrows = (props) => {
  const getClassNamesFor = (col, dir) => {
    return props.sortedField === col && props.sortDir === dir
      ? "sortButton active"
      : "sortButton";
  };

  return (
    <span className={styles.arrowContainer}>
      <button
        className={getClassNamesFor(props.col, "asc")}
        onClick={props.handleClick}
        col={props.col}
        direction="asc"
        sorttype={props.sorttype}
      >
        &#9650;
      </button>
      <button
        className={getClassNamesFor(props.col, "desc")}
        onClick={props.handleClick}
        col={props.col}
        direction="desc"
        sorttype={props.sorttype}
      >
        &#9660;
      </button>
    </span>
  );
};
