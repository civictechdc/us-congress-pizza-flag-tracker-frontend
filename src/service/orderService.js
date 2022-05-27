import { httpAuthenticate } from "../http-common";
import AuthService from "../service/authService";

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
  const serviceCall = () => {
    return get(id)
      .then((response) => {
        setOrder(response.data);
        if (setUnalteredOrder !== false) {
          setUnalteredOrder(response.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  try {
    AuthService.refreshTokenWrapperFunction(serviceCall);
  } catch (e) {
    console.log(e);
  }
};

const orderServiceObject = {
  getAll,
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
