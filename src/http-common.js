import axios from "axios";
import AuthService from "./services/AuthService";

export const baseURL = process.env.REACT_APP_BACKEND_API + "/api";
//export const baseURL = "http://localhost:5000";

export const httpAuthenticate = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Access-Tokens": AuthService.getToken(),
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
