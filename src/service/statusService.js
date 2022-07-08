import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

const retrieveStatuses = (setMessage, setStatuses, setPopUpBox) => {
  const serviceToExecute = () => {
    return getStatus().then((response) => {
      setStatuses(response.data.statuses);
    });
  };
  AuthService.checkTokenAndExecute(serviceToExecute).then(function (
    serviceResult
  ) {
    if (serviceResult != undefined) {
      setPopUpBox("block");
      setMessage("Status Issue: " + serviceResult.message);
    }
  });
};

const statusServiceObject = {
  getStatus,
  updateStatus,
  retrieveStatuses,
};
export default statusServiceObject;
