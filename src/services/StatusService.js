import { httpAuthenticate } from "../http-common";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const statusServiceObject = {
  getStatus
};
export default statusServiceObject;

