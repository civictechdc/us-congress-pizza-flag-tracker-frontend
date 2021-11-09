import { httpAuthenticate } from "../http-common";
import { bcrypt } from "bcrypt";
// example =>  $2a$10$CwTycUXWue0Thq9StjUM0u => to be added always to the password hash

class UserService {
  create(
    username,
    password,
    is_admin,
    can_create_update_delete_orders,
    can_update_password_for,
    can_update_status_for
  ) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return httpAuthenticate().post("users/create", {
      username,
      password: hashedPassword,
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
