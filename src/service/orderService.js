import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

/* remember also the api/qrcode img API*/

const getAll = (params) => {
  if (params) return httpAuthenticate().get("/orders" + params);
  return httpAuthenticate().get("/orders");
};

const getAllByOrderNumber = (params) => {
  return httpAuthenticate().get(`order_num/${params}`);
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

const reset = () => {
  return httpAuthenticate().get("/reset");
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

const getOrder = (id, setOrder, setUnalteredOrder, setLoading) => {
  const serviceToExecute = async () => {
    const response = await get(id);
    setOrder(response.data);
    if (setUnalteredOrder !== false) {
      setUnalteredOrder(response.data);
    }
    setLoading(false);
  };
  return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
    throw err;
  });
};

const orderServiceObject = {
  getAll,
  getAllByOrderNumber,
  get,
  create,
  update,
  reset,
  remove,
  removeAll,
  findByOrderNumber,
  getOrderLog,
  getOrder,
};

export default orderServiceObject;
