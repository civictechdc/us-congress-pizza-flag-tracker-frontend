import { useState } from "react";
import userService from "../service/userService";
import AuthService from "../service/authService";
import styles from "../style/password.module.css";
import { adminControl } from "./protectedRoute/permissions";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [userName, setUserName] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPassword2, setUserNewPassword2] = useState("");

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

  function changeUserName(event) {
    setUserName(event.target.value);
  }

  function changeUserNewPassword(event) {
    setUserNewPassword(event.target.value);
  }

  function changeUserNewPassword2(event) {
    setUserNewPassword2(event.target.value);
  }

  const comparePasswords = (newPass, newPass2) => {
    return newPass == newPass2;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comparePasswords(newPassword, newPassword2)) {
      const serviceToExecute = () => {
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
        AuthService.checkTokenAndExecute(serviceToExecute);
      } catch (e) {
        setMessage("An error occurred. Please try logging out and back in.");
      }
    } else {
      setMessage("New passwords must match!");
    }
  };

  // submit handler for admin password update
  const submitAdmin = (e) => {
    e.preventDefault();
    if (comparePasswords(userNewPassword, userNewPassword2)) {
      const serviceToExecute = () => {
        return userService
          .updateOthersPassword({
            username: userName,
            oldPassword: userNewPassword,
          })
          .then((response) => {
            if (response.status === 200) {
              setUserName("");
              setUserNewPassword("");
              setUserNewPassword2("");
              setMessage("Password updated successfully.");
            } else {
              setMessage("An error occurred: " + response.statusText);
            }
          })
          .catch((err) => setMessage(""));
      };
      try {
        AuthService.checkTokenAndExecute(serviceToExecute);
      } catch (e) {
        console.log(`error occurred while updating password: ${e}`);
        setMessage("");
      }
    } else {
      setMessage("New passwords must match!");
    }
  };

  return (
    <>
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
      {adminControl() ? (
        <form className={styles.form2} onSubmit={submitAdmin}>
          <h2 className={styles.form_title}>Change User Password</h2>

          <label>User Being Changed</label>
          <input type="text" value={userName} onChange={changeUserName}></input>
          <label>New Password</label>
          <input
            type="password"
            value={userNewPassword}
            onChange={changeUserNewPassword}
          ></input>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={userNewPassword2}
            onChange={changeUserNewPassword2}
          ></input>
          <input className={styles.form2_submit} type="submit" />
        </form>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PasswordUpdate;
