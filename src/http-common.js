import axios from "axios";

export const baseURL = "http://localhost:5000/";

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});

