import http from "../http-common";
import authHeader from "../services/auth-header";

/* remember also the api/qrcode img API*/

const getAll = () => {
  return http.get("/api/orders");
};

const get = (uuid) => {
  return http.get(`/api/orders/${uuid}`);
};

const create = (data) => {
  return http.post("/api/orders/create", data);
};

const update = (id, data) => {
  return http.put(`/api/orders/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/orders/${id}`);
};

const removeAll = () => {
  return http.delete(`/api/orders`);
};

const findByOrderNumber = (order_number) => {
  return http.get(`/api/order_num/${order_number}`);
};

const orderServiceObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByOrderNumber,
};
export default orderServiceObject;
