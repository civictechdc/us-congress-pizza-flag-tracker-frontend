import http from "../http-common";

const getAll = () => {
  return http.get("/orders");
};

const get = uuid => {
  return http.get(`/orders/${uuid}`);
};

const create = data => {
  return http.post("/orders/create", data);
};

const update = (id, data) => {
  return http.put(`/orders/${id}`, data);
};

const remove = id => {
  return http.delete(`/orders/${id}`);
};

const removeAll = () => {
  return http.delete(`/orders`);
};

const findByTitle = title => {
  return http.get(`/orders?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};