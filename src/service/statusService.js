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
  try {
    AuthService.checkTokenAndExecute(serviceToExecute).then(function (
      serviceCallResult
    ) {
      if (serviceCallResult != undefined) {
        setPopUpBox("block");
        setMessage((message) => {
          return {
            ...message,
            text: "Status Issue: " + serviceCallResult.message,
          };
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const statusServiceObject = {
  getStatus,
  updateStatus,
  retrieveStatuses,
};
export default statusServiceObject;
