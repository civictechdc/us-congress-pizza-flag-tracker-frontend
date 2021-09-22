import React, { useState } from "react";

import { STATUSES, DEPTCODES } from "./Statuses.js";

const StatusForm = () => {
  const initialStatusState = {
    id: null,
    login_office_code: "not logged in",
    current_desciption: "select a status",
    selection: "select",
  };
  const [status, setStatus] = useState(initialStatusState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStatus({ ...status, [name]: value });
  };

  const unLogged = (status.login_office_code === "not logged in")
    ? ""
    : <div>
        <h6>Status: {status.current_desciption}</h6>
        <form>
          <div className="form-group">
            <label htmlFor="current_desciption">Log in: </label>
            <select
              value={status.selection}
              // defaultValue={"select"}            
              // value={status.current_desciption}
              id="current_desciption"
              onChange={handleInputChange}
              name="current_desciption"
              >
              <option value="select" key="black" hidden disabled>&nbsp;&nbsp;&nbsp;Select</option>
              {/* Need styling advise -low priority */}
              {STATUSES && STATUSES.map((element, index) => {
                if ((status.login_office_code === element.office_code) || 
                (status.login_office_code === "ADMIN") || 
                ((element.office_code === "ALL") && (status.login_office_code !== "not logged in"))
                ) {
                  return (
                    <option value={element.description} key={index}>
                      #{element.sequence_num} {element.description}
                    </option>              
                  );
                } else return (<option hidden key={index} />)  // handle "Array.prototype.map() expects a value to be returned at the end of arrow function array-callback-return" error
              })}
            </select>
          </div>      
        </form>
      </div>;

   return (
    <div>
      <h4>User: {status.login_office_code}</h4>
      <form>
        <div className="form-group">
          <label htmlFor="login_office_code">Log in: </label>
          <select
              value={status.selection}
              // defaultValue={"select"}
              // value={status.login_office_code}
              id="login_office_code"
              onChange={handleInputChange}
              name="login_office_code"
            >
            <option value="select" key="blank" disabled hidden>&nbsp;&nbsp;&nbsp;Select</option>
            {/* Need styling advise -low priority */}
            {DEPTCODES && DEPTCODES.map((code, index) => {
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
      {unLogged}
    </div>      
  );
}

export default StatusForm;