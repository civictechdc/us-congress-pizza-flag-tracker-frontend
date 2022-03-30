import { React } from "react";

const FAKE_TABLE_DATA = [
  {
    event_uuid: "9160a1ad-8124-4632-b35e-dcf09787974e",
    order_uuid: "38fd785f-7604-42b9-aa9e-493b81416534",
    order_number: "90",
    usa_state: "CO",
    home_office_code: "CO-01",
    order_status_id: 2,
    updated_at: "2022-03-30:47:03:06",
  },

  {
    event_uuid: "8160a1ad-8124-4632-b35e-dcf09787974e",
    order_uuid: "38fd785f-7604-42b9-aa9e-493b81416534",
    order_number: "91",
    usa_state: "CO",
    home_office_code: "CO-01",
    order_status_id: 2,
    updated_at: "2022-03-30:46:03:06",
  },
  {
    event_uuid: "7160a1ad-8124-4632-b35e-dcf09787974e",
    order_uuid: "38fd785f-7604-42b9-aa9e-493b81416534",
    order_number: "90",
    usa_state: "CO",
    home_office_code: "CO-01",
    order_status_id: 2,
    updated_at: "2022-03-30:03:03:06",
  },
  {
    event_uuid: "87247f3e-004e-4271-95d4-ac922ff935ce",
    order_uuid: "38fd785f-7604-42b9-aa9e-493b81416534",
    order_number: "90",
    usa_state: "CO",
    home_office_code: "CO-04",
    order_status_id: 1,
    updated_at: "2022-03-29:23:13:06",
  },
];

export const LogTable = () => {
  const compareChange = (value, index) => {
    if (FAKE_TABLE_DATA.length == 1) {
      return "table-light";
    }
    if (index == 0) {
      if (FAKE_TABLE_DATA[index][value] == FAKE_TABLE_DATA[index + 1][value]) {
        return "table-light";
      }
      return "table-success";
    } else if (index < FAKE_TABLE_DATA.length - 1 && index > 0) {
      if (FAKE_TABLE_DATA[index][value] == FAKE_TABLE_DATA[index - 1][value]) {
        return "table-light";
      } else if (
        FAKE_TABLE_DATA[index][value] != FAKE_TABLE_DATA[index - 1][value]
      ) {
        return "table-warning";
      }
      if (FAKE_TABLE_DATA[index][value] != FAKE_TABLE_DATA[index + 1][value]) {
        return "table-warning";
      }
    } else if (index == FAKE_TABLE_DATA.length - 1) {
      if (FAKE_TABLE_DATA[index][value] == FAKE_TABLE_DATA[index - 1][value]) {
        return "table-light";
      } else if (
        FAKE_TABLE_DATA[index][value] != FAKE_TABLE_DATA[index - 1][value]
      ) {
        return "table-warning";
      }
    }
  };

  return (
    <table className="table table-striped table-bordered table-sm">
      <thead className="thead-dark">
        <th>Order updated at</th>
        <th>Order ID</th>
        <th>Order number</th>
        <th>State</th>
        <th>Office code</th>
        <th>Status</th>
      </thead>
      <tbody>
        {FAKE_TABLE_DATA.map((row, index) => {
          return (
            <tr key={row.event_uuid}>
              <td className={compareChange("updated_at", index)}>
                {row.updated_at}
              </td>
              <td className={compareChange("order_uuid", index)}>
                {row.order_uuid}
              </td>
              <td className={compareChange("order_number", index)}>
                {row.order_number}
              </td>
              <td className={compareChange("usa_state", index)}>
                {row.usa_state}
              </td>
              <td className={compareChange("home_office_code", index)}>
                {row.home_office_code}
              </td>
              <td className={compareChange("order_status_id", index)}>
                {String(row.order_status_id)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
