import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

const retrieveStatuses = (setStatuses) => {
  const serviceToExecute = async () => {
    const response = await getStatus();
    setStatuses(response.data.statuses);
  };
  return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
    throw err;
  });
};

const statusServiceObject = {
  getStatus,
  updateStatus,
  retrieveStatuses,
};
export default statusServiceObject;
