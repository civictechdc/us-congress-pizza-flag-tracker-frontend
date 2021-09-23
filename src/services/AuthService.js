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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
