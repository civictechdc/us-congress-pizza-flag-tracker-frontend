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
      })
      .catch((e) =>  {
        return e
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
  checkTokenAndExecute(serviceToExecute) {
    return serviceToExecute().catch((e) => {
      const error_msg = e.response?.data?.error_msg || e

      if (e?.response?.status === 401 && e?.response?.data?.refreshedToken) {
        this.updateToken(e.response.data.refreshedToken);
        return serviceToExecute();                    // success
      } else {                                        // error
        if (e.response?.data?.error_msg) {            // error --> got a response from the server
          const errorArray = error_msg.split("\n");
          const basicError = errorArray[0];
          console.log("Auth error: ", basicError);
          throw basicError;
        } else {                                      // error --> no server response, connection down?
          console.log("Auth error: ", error_msg);
          throw error_msg;
        }
      }
    });
  } 
}

export default new AuthService();
