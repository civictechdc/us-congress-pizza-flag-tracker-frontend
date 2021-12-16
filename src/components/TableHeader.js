import { SortArrows } from "./Sort/SortArrows";

export const TableHeader = (props) => {
  const { sortedField, sortDir, setSortedField, setSortDir, setSortType } =
    props;

  const handleSortClick = (e) => {
    setSortedField(e.target.getAttribute("col"));
    setSortDir(e.target.getAttribute("direction"));
    setSortType(e.target.getAttribute("sorttype"));
  };

  return (
    <thead>
      <tr>
        <th scope="col">
          Order Number
          {
            <SortArrows
              col="order_number"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
        <th scope="col">
          USA State
          {
            <SortArrows
              col="usa_state"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
        <th scope="col">
          Congressional Office
          {
            <SortArrows
              col="home_office_code"
              handleClick={handleSortClick}
              sorttype="alpha"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
        <th scope="col">
          Order Status
          {
            <SortArrows
              col="order_status_id"
              handleClick={handleSortClick}
              sorttype="numeric"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
        <th scope="col">
          Date created
          {
            <SortArrows
              col="created_at"
              handleClick={handleSortClick}
              sorttype="date"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
        <th scope="col">
          Date updated
          {
            <SortArrows
              col="updated_at"
              handleClick={handleSortClick}
              sorttype="date"
              sortedField={sortedField}
              sortDir={sortDir}
            />
          }
        </th>
      </tr>
    </thead>
  );
};
