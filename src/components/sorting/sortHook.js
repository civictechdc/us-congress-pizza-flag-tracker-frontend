import React from "react";

export const useSortableData = (orders, options) => {
  const { sortedField, sortDir, sortType } = options;

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [];
    if (orders !== undefined) {
      sortableOrders = [...orders];
    }
    if (sortedField !== null) {
      if (sortType === "alpha" || sortType === "date") {
        sortableOrders = alphaSort(sortableOrders, sortedField, sortDir);
        return sortableOrders;
      } else if (sortType === "numeric") {
        sortableOrders = numSort(sortableOrders, sortedField, sortDir);
        console.log(sortableOrders);
        return sortableOrders;
      }
    }
  }, [orders, sortedField, sortDir, sortType]);
  return sortedOrders;
};

export const alphaSort = (sortableOrders, sortedField, sortDir) => {
  sortableOrders.sort((a, b) => {
    if (a[sortedField] < b[sortedField]) {
      return sortDir === "asc" ? -1 : 1;
    }
    if (a[sortedField] > b[sortedField]) {
      return sortDir === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortableOrders;
};

export const numSort = (sortableOrders, sortedField, sortDir) => {
  sortableOrders.sort((a, b) => {
    if (Number(a[sortedField]) < Number(b[sortedField])) {
      return sortDir === "asc" ? -1 : 1;
    }
    if (Number(a[sortedField]) > Number(b[sortedField])) {
      return sortDir === "asc" ? 1 : -1;
    }
    return 0;
  });
  return sortableOrders;
};
