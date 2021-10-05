import axios from "axios";
import getToken from "./services/auth-header";

export const baseURL = process.env.REACT_APP_BACKEND_API + "/api";
//export const baseURL = "http://localhost:5000";
console.log("BaseURL ", baseURL);

export const httpSecure = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Access-Tokens": getToken(),
    },
  });
};

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
