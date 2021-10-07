import { httpAuthenticate } from "../http-common";

/* remember also the api/qrcode img API*/

/* remember also the api/qrcode img API*/

const getAll = () => {
  return httpAuthenticate().get("/api/orders");
};

const get = (uuid) => {
  return httpAuthenticate().get(`/api/orders/${uuid}`);
};

const create = (data) => {
  return httpAuthenticate().post("/api/orders/create", data);
};

const update = (id, data) => {
  return httpAuthenticate().put(`/api/orders/${id}`, data);
};

const remove = (id) => {
  return httpAuthenticate().delete(`/api/orders/${id}`);
};

const removeAll = () => {
  return httpAuthenticate().delete(`/api/orders`);
};

const findByOrderNumber = (order_number) => {
  return httpAuthenticate().get(`/api/order_num/${order_number}`);
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
