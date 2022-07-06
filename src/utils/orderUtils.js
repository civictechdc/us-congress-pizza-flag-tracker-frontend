import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";

const updateOrder = (order) => {
  const serviceCall = () => {
    return OrderDataService.update(order.uuid, order).then((response) => {
      setPopUpBox("block");
      setMessage({
        ...message,
        checkSaved: true,
        text: "The order was updated successfully!",
      });
    });
  };
  try {
    AuthService.refreshTokenWrapperFunction(serviceCall);
  } catch (e) {
    console.log(`error occurred while updating order: ${e}`);
  }
};

export { updateOrder };
