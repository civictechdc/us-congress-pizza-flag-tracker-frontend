import React, { useState } from "react";
import { STATUSES } from "./Statuses.js";

const Status = () => {
  const initialStatusState = {
    id: null,
    login_office_code: "",
    current_status: "",
  };
  const [status, setStatus] = useState(initialStatusState);

  return (
    <div></div>      
  );
}

export default Status;