import axios from "axios";
import AuthService from "./service/authService";

export const baseURL = getBaseUrl();
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

function getBaseUrl() {
  const appUrl = window.location.origin;
  const isGitpodUrl = appUrl.startsWith("https://3000");
  const originUrl = isGitpodUrl
    ? "https://5000" + appUrl.substr(12)
    : process.env.REACT_APP_BACKEND_API;
  return originUrl + "/api";
}
