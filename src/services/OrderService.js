import { httpAuthenticate } from "../http-common";

/* remember also the api/qrcode img API*/

/* remember also the api/qrcode img API*/

const http2 = (func) => {
  const retval = func();
  console.log("debug", retval);
  return retval;
};

const getAll = () => {
  const requestFunc = () => {
    return httpAuthenticate().get("/orders");
  };

  return http2(requestFunc);
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
