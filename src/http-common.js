import axios from "axios";

export const baseURL = process.env.REACT_APP_BACKEND_API;
//export const baseURL = "http://localhost:5000";
console.log("BaseURL ", baseURL);

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
