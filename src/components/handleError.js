export const handleError = (error, setMessage) => {
  const resMessage =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  setMessage(resMessage);
};
