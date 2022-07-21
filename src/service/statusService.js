import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

const retrieveStatuses = (setMessage, setStatuses, setPopUpBox) => {
  const serviceToExecute = async () => {
    const response = await getStatus();
    setStatuses(response.data.statuses);
  };
  return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
    setMessage("Issue: " + err);
    setPopUpBox("block");
  });
};

const statusServiceObject = {
  getStatus,
  updateStatus,
  retrieveStatuses,
};
export default statusServiceObject;
