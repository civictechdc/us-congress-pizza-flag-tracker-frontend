import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "../style/addUser.module.css"

import UserService from "../service/userService";

function required(value) {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);

    this.state = {
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
  }
  onChangeValue(field_name, value) {
    const state = this.state;
    state[field_name] = value;
    this.setState(state);
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      UserService.create(
        this.state.username,
        this.state.password,
        this.state.office_code,
        this.state.is_admin,
        this.state.can_create_update_delete_orders,
        this.state.can_update_password_for,
        this.state.can_update_status_for
      ).then(
        (response) => {
          this.setState({
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

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className={styles.addContainer}>
        <h1 className={styles.title}>Add New User</h1>
        <div className="card card-container">
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={(e) =>
                      this.onChangeValue("username", e.target.value)
                    }
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.onChangeValue("password", e.target.value)
                    }
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="office_code">Office Code</label>
                  <Input
                    type="office_code"
                    className="form-control"
                    name="office_code"
                    value={this.state.office_code}
                    onChange={(e) =>
                      this.onChangeValue("office_code", e.target.value)
                    }
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
                    value={this.state.can_update_password_for}
                    onChange={(e) =>
                      this.onChangeValue(
                        "can_update_password_for",
                        e.target.value
                      )
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
                    value={this.state.can_update_status_for}
                    onChange={(e) =>
                      this.onChangeValue(
                        "can_update_status_for",
                        e.target.value
                      )
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
                    value={this.state.can_create_update_delete_orders}
                    onChange={(e) =>
                      this.onChangeValue(
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
                    value={this.state.is_admin}
                    onChange={(e) =>
                      this.onChangeValue("is_admin", e.target.value)
                    }
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Save</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
