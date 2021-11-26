import http from "../http-common";

class AuthService {
  getToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      return user.accessToken;
    } else {
      return "";
    }
  }
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

  getCurrentUserName() {
    const user = this.getCurrentUser();
    let username;
    if (user && user.username) {
      username = user.username;
    } else if (user && !user.username) {
      username = "Undefined";
    } else {
      username = "Not logged in";
    }
    return username;
  }

  updateToken(newToken) {
    const user = JSON.parse(localStorage.getItem("user"));
    user["accessToken"] = newToken;
    console.log("new user is: ", user);
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export default new AuthService();
