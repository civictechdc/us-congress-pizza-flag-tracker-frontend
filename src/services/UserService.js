import { httpAuthenticate } from "../http-common";

class UserService {
  create(
    username,
    password,
    is_admin,
    can_create_update_delete_orders,
    can_update_password_for,
    can_update_status_for
  ) {
    return httpAuthenticate().post("users/create", {
      username,
      password,
      is_admin,
      can_create_update_delete_orders,
      can_update_password_for,
      can_update_status_for,
    });
  }

  getUsers() {
    return httpAuthenticate().get("users");
  }
}

export default new UserService();
