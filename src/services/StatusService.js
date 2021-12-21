import { httpAuthenticate } from "../http-common";

const getStatus = () => {
  return httpAuthenticate().get("/statuses");
};

const updateStatus = (id, data) => {
  return httpAuthenticate().put(`/scan/${id}`, data);
};

/*
const revertStatus = (id, data) => {
  return httpAuthenticate().put(`/revert/${id}`, data);
};
*/

const statusServiceObject = {
  getStatus,
  updateStatus,
  // revertStatus,
};
export default statusServiceObject;
