import React, { useState } from "react";
import { STATUSES, DEPTCODES } from "./Statuses.js";

const Status = () => {
  const initialStatusState = {
    id: null,
    login_office_code: "not logged in",
    current_status: "",
  };
  const [status, setStatus] = useState(initialStatusState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStatus({ ...status, [name]: value });
  };

  return (
    <div>
      <h4>User: {status.login_office_code}</h4>
      <form>
        <div className="form-group">
          <label htmlFor="login_office_code">Log in: </label>
          <select
              value={status.login_office_code}
              id="login_office_code"
              onChange={handleInputChange}
              name="login_office_code"
            >
            {STATUSES && DEPTCODES.map((code, index) => {
              return (
                <option value={code.dept_code} key={index}>
                  {code.dept_code}
                </option>
              );
            })}
          </select>
        </div>
        <hr />
      </form>
    </div>      
  );
}

export default Status;