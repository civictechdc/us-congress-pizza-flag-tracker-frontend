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
    const user = JSON.parse(localStorage.getItem("user"));
    let username = user.username
    
    return username;
  } 

  updateToken(newToken) {
    const user = JSON.parse(localStorage.getItem("user"));
    user["accessToken"] = newToken;
    console.log("new user is: ", user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //this method exists so that any call to the database first checks for a 401 error; if the 401 error is caused by an outdated (but not expired) token, this method will generate a new token and re-try the command.
  refreshTokenWrapperFunction(serviceCall) {
    serviceCall().catch((e) => {
      if (e.response?.status === 401) {
        if (e.response?.data?.refreshedToken) {
          this.updateToken(e.response.data.refreshedToken);
          serviceCall();
        } else {
          console.log("Auth error: ", e);
          return e;
        }
      } else {
        console.log("Auth error: ", e);
        return e;
      }
    });
  }
}

export default new AuthService();
