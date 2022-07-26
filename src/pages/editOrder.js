import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { editOrderControl, isUser } from "../components/permissions";
import EditView from "../components/editView";
import LoginSubComponent from "../components/loginSubComponent";

const EditOrder = () => {
  const params = useParams("/orders/:id");
  let navigate = useNavigate();

  return isUser() ? (
    editOrderControl() ? (
      <EditView editId={params.id} navigate={navigate} />
    ) : (
      <Navigate to="/" replace />
    )
  ) : (
    <LoginSubComponent />
  );
};

export default EditOrder;
