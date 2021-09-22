import http from "../http-common";

class AuthService {
  login(username, password) {
    return http
      .post(
        "signin",
        {},
        {
          auth: {
            username,
            password,
          },
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signup(
    username,
    password,
    is_admin,
    can_create_update_delete_orders,
    can_update_password_for,
    can_update_status_for
  ) {
    return http.post("signup", {
      username,
      password,
      is_admin,
      can_create_update_delete_orders,
      can_update_password_for,
      can_update_status_for,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
