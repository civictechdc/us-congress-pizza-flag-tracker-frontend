import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

const retrieveStatuses = (setMessage, setStatuses, setPopUpBox) => {
  const serviceCall = () => {
    return getStatus().then((response) => {
      setStatuses(response.data.statuses);
    });
  };
  try {
    AuthService.refreshTokenWrapperFunction(serviceCall);
  } catch (e) {
    setPopUpBox("block");
    console.log("retrieveStatuses: ", e);
    if (e.response.status === 401) {
      setMessage("You must be logged in to view this page");
    } else {
      setMessage(
        e.message +
          "." +
          "Check with admin if server is down or try logging out and logging in."
      );
    }
  }
};

const statusServiceObject = {
  getStatus,
  updateStatus,
  retrieveStatuses,
};
export default statusServiceObject;
