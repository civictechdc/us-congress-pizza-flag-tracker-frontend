import authHeader from './auth-header';
import http from "../http-common";

class UserService {
  getUsers() {
    return http.get("users");
  }
}

export default new UserService();