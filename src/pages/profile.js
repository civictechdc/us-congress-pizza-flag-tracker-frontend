import React from "react";
import AuthService from "../service/authService";
import PasswordUpdate from "../components/passwordUpdate";

const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  const roles = Object.fromEntries(
    Object.entries(currentUser).filter(([key]) =>
      [
        "can_create_update_delete_orders",
        "can_update_password_for",
        "can_update_status_for",
        "is_admin",
      ].includes(key)
    )
  );

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {roles &&
          Object.entries(roles).map((role, index) => {
            switch (role[0]) {
              case "can_create_update_delete_orders":
                return (
                  <li key={index}>
                    Can create, update, and delete orders: {role[1]}
                  </li>
                );

              case "can_update_password_for":
                return <li key={index}>Can update password for: {role[1]}</li>;

              case "can_update_status_for":
                return <li key={index}>Can update status for: {role[1]}</li>;

              case "is_admin":
                return <li key={index}>Admin: {role[1]}</li>;

              default:
                return false;
            }
          })}
      </ul>
      <p>
        <strong>Update password:</strong>
        <PasswordUpdate />
      </p>
    </div>
  );
};
export default Profile;
