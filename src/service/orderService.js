import { httpAuthenticate } from "../http-common";

/* remember also the api/qrcode img API*/

const getAll = () => {
  return httpAuthenticate().get("/orders");
};

const get = (uuid) => {
  return httpAuthenticate().get(`/orders/${uuid}`);
};

const create = (data) => {
  return httpAuthenticate().post("/orders/create", data);
};

const update = (id, data) => {
  return httpAuthenticate().put(`/orders/${id}`, data);
};

const remove = (id) => {
  return httpAuthenticate().delete(`/orders/${id}`);
};

const removeAll = () => {
  return httpAuthenticate().delete(`/orders`);
};

const findByOrderNumber = (order_number) => {
  return httpAuthenticate().get(`/order_num/${order_number}`);
};

const getOrderLog = (order_number) => {
  return httpAuthenticate().get(`/orders/logs/${order_number}`);
};

const orderServiceObject = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByOrderNumber,
  getOrderLog,
};
export default orderServiceObject;
