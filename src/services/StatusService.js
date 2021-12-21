import { httpAuthenticate } from "../http-common";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

const statusServiceObject = {
  getStatus,
  updateStatus,
};
export default statusServiceObject;
