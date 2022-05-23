import React, { useState, useEffect } from "react";

const PopUpBox = (props) => {
  const initialOrderState = {
    description: "",
  };

  const initialMessageState = {
    checkSaved: true,
    isLastChangeUSState: false,
    submitted: false,
    success: "",
    whyStatus: false,
  };

  const [order, setOrder] = useState(initialOrderState);
  const [message, setMessage] = useState(initialMessageState);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popUpBox, setPopUpBox] = useState("none");
  const mode = "edit";

  return (
    <div className="pop-container" style={{ display: popUpBox }}>
      <div className="pop-up" onClick={closePopUpBox}>
        <h3>{message.success}</h3>
      </div>
    </div>
  );
};

export default PopUpBox;
