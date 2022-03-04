import { useState } from "react";
import userService from "../service/userService";
import AuthService from "../service/authService";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    let { name, value } = e;
    if (e.target) {
      name = e.target.name;
      value = e.target.value;
    }
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "newPassword2":
        setNewPassword2(value);
        break;
      default:
        break;
    }
  };
  const comparePasswords = (newPass, newPass2) => {
    return newPass == newPass2;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comparePasswords(newPassword, newPassword2)) {
      const serviceCall = () => {
        return userService
          .updateOwnPassword({
            newPassword: newPassword,
            oldPassword: oldPassword,
          })
          .then((response) => {
            if (response.status === 200) {
              setOldPassword("");
              setNewPassword("");
              setNewPassword2("");
              setMessage("Password updated successfully.");
            } else {
              setMessage("An error occurred: " + response.statusText);
            }
          })
          .catch((err) => {
            setMessage(
              err.response.data.error ||
                err.response.toString() ||
                err.toString()
            );
          });
      };
      try {
        AuthService.refreshTokenWrapperFunction(serviceCall);
      } catch (e) {
        setMessage("An error occurred. Please try logging out and back in.");
      }
    } else {
      setMessage("New passwords must match!");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="oldPassword">Type your current password here...</label>
      <input
        type="password"
        name="oldPassword"
        value={oldPassword}
        onChange={handleChange}
      ></input>
      <p>&nbsp;</p>
      <label htmlFor="newPassword">Enter your new password...</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
      ></input>
      <p>&nbsp;</p>
      <label htmlFor="newPassword2">Confirm your new password...</label>
      <input
        type="password"
        name="newPassword2"
        value={newPassword2}
        onChange={handleChange}
      ></input>
      <p>&nbsp;</p>
      <input type="submit"></input>
      {message}
    </form>
  );
};

export default PasswordUpdate;
