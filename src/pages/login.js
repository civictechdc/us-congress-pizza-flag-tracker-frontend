import React, { useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { generatePath } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "../style/login.module.css";

import AuthService from "../service/authService";
import OrderDataService from "../service/orderService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const history = useHistory();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    return AuthService.login(username, password).then(
      () => {
        const whereAreYouGoing = async () => {
          if (location.state === undefined) {
            return history.push("/");
          } else {
            let id = location.state.destination.slice(6);
            let path = generatePath("/scan/:id", { id: id });
            let serviceToExecute = async () => {
              let response = await OrderDataService.get(id);
              return response.data;
            };

            let order = await AuthService.checkTokenAndExecute(
              serviceToExecute
            );
            let orderOfficeCode =
              order !== undefined ? order.home_office_code : "";
            let destination = history.push(path, {
              orderOfficeCheck: orderOfficeCode,
            });

            return destination;
          }
        };

        whereAreYouGoing();
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Login</h1>
      <div className="card card-container">
        <Form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              password="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              data-button-function="Login"
            >
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
