import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "../style/addUser.module.css";

import UserService from "../service/userService";

const required = (value) => {
  if (value) return;

  return (
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
};

const vusername = (value) => {
  if (value.length > 2 && value.length < 21) return;

  return (
    <div className="alert alert-danger" role="alert">
      The username must be between 3 and 20 characters.
    </div>
  );
};

const vpassword = (value) => {
  if (value.length > 5 && value.length < 41) return;

  return (
    <div className="alert alert-danger" role="alert">
      The password must be between 6 and 40 characters.
    </div>
  );
};

const AddUserView = () => {
  // super(props);
  // this.handleRegister = this.handleRegister.bind(this);
  // this.onChangeValue = this.onChangeValue.bind(this);

  const initialState = {
    username: "",
    password: "",
    office_code: "",
    can_update_status_for: "NONE",
    can_create_update_delete_orders: "N",
    can_update_password_for: "NONE",
    is_admin: "N",
    successful: false,
    message: "",
  };

  const [state, setState] = useState(initialState);
  let form = 0;
  let checkBtn = 0;

  const onChangeValue = (field_name, value) => {
    // const state = state;
    // state[field_name] = value;
    // this.setState(state);
    setState({
      ...state,
      [field_name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setState({
      ...state,
      message: "",
      successful: false,
    });

    form.validateAll();

    if (checkBtn.context._errors.length === 0) {
      UserService.create(
        state.username,
        state.password,
        state.office_code,
        state.is_admin,
        state.can_create_update_delete_orders,
        state.can_update_password_for,
        state.can_update_status_for
      ).then(
        (response) => {
          setState({
            ...state,
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setState({
            ...state,
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  };

  return (
    <div className={styles.addContainer}>
      <h1 className={styles.title}>Add New User</h1>
      <div className="card card-container">
        <Form
          onSubmit={handleRegister}
          ref={(c) => {
            form = c;
          }}
        >
          {!state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={state.username}
                  onChange={(e) => onChangeValue("username", e.target.value)}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={state.password}
                  onChange={(e) => onChangeValue("password", e.target.value)}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="office_code">Office Code</label>
                <Input
                  type="office_code"
                  className="form-control"
                  name="office_code"
                  value={state.office_code}
                  onChange={(e) => onChangeValue("office_code", e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="can_update_password_for">
                  Can update password for (ALL, SELF, NONE, or office code)
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="can_update_password_for"
                  value={state.can_update_password_for}
                  onChange={(e) =>
                    onChangeValue("can_update_password_for", e.target.value)
                  }
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="can_update_status_for">
                  Can update status for (ALL, NONE, or office code)
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="can_update_status_for"
                  value={state.can_update_status_for}
                  onChange={(e) =>
                    onChangeValue("can_update_status_for", e.target.value)
                  }
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="can_create_update_delete_orders">
                  Can create, update, and delete orders (Y or N))
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="can_create_update_delete_orders"
                  value={state.can_create_update_delete_orders}
                  onChange={(e) =>
                    onChangeValue(
                      "can_create_update_delete_orders",
                      e.target.value
                    )
                  }
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="is_admin">Admin (Y or N)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="is_admin"
                  value={state.is_admin}
                  onChange={(e) => onChangeValue("is_admin", e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Save</button>
              </div>
            </div>
          )}
          {state.message && (
            <div className="form-group">
              <div
                className={
                  state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              checkBtn = c;
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default AddUserView;
