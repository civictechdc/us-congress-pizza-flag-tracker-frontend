import { httpAuthenticate } from "../http-common";

class UserService {
  create(
    username,
    password,
    office_code,
    is_admin,
    can_create_update_delete_orders,
    can_update_password_for,
    can_update_status_for
  ) {
    return httpAuthenticate().post("users/create", {
      username,
      password,
      office_code,
      is_admin,
      can_create_update_delete_orders,
      can_update_password_for,
      can_update_status_for,
    });
  }

  getUsers() {
    return httpAuthenticate().get("users");
  }

  updateOwnPassword({ newPassword, oldPassword }) {
    const data = { new_password: newPassword, old_password: oldPassword };
    return httpAuthenticate().post("/users/self/update/password", {
      data,
    });
  }

  updateOthersPassword({ username, newPassword }) {
    const data = { username: username, new_password: newPassword };
    return httpAuthenticate().post("/users/admin/update/password", {
      data,
    });
  }
}

export default new UserService();
