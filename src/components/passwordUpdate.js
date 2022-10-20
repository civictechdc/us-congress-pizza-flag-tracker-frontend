import { useContext, useState } from "react";
import userService from "../service/userService";
import AuthService from "../service/authService";
import { adminControl } from "./permissions";
import PopUpBox from "./popUpBox";
import UserContext from "./userContext";
import styles from "../style/password.module.css";

const PasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [userName, setUserName] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPassword2, setUserNewPassword2] = useState("");

  const [message, setMessage] = useState("");
  const [popUpBox, setPopUpBox] = useState("none");
  const { setUserDisplay } = useContext(UserContext);

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
      const serviceToExecute = async () => {
        const response = await userService.updateOwnPassword({
          newPassword: newPassword,
          oldPassword: oldPassword,
        });
        if (response.status === 200) {
          setOldPassword("");
          setNewPassword("");
          setNewPassword2("");
          setPopUpBox("block");
          setMessage("The password was updated successfully!");
        }
      };
      return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
        setMessage("Issue: " + err);
        setPopUpBox("block");
      });
    } else {
      setPopUpBox("block");
      setMessage("New passwords must match!");
    }
  };

  // submit handler for admin password update
  const submitAdmin = (e) => {
    e.preventDefault();
    if (comparePasswords(userNewPassword, userNewPassword2)) {
      const serviceToExecute = async () => {
        const response = await userService.updateOthersPassword({
          username: userName,
          oldPassword: userNewPassword,
        });
        if (response.status === 200) {
          setUserName("");
          setUserNewPassword("");
          setUserNewPassword2("");
          setPopUpBox("block");
          setMessage("The password was updated successfully!");
        }
      };
      return AuthService.checkTokenAndExecute(serviceToExecute).catch((err) => {
        setMessage("Issue: " + err);
        setPopUpBox("block");
      });
    } else {
      setPopUpBox("block");
      setMessage("New passwords must match!");
    }
  };

  const closePopUpBox = () => {
    setPopUpBox("none");
    if (
      message.includes(
        "401 Unauthorized"
      )
    ) {
      AuthService.logout();
      window.location.reload();
    }
    setUserDisplay();
  };

  return (
    <>
      <strong>Update password:</strong>
      <form className={styles.passwordForm} onSubmit={submitHandler}>
        <label htmlFor="oldPassword" className={styles.passwordFormLabel}>
          Type your current password here
        </label>
        <input
          type="password"
          name="oldPassword"
          value={oldPassword}
          className={styles.passwordFormInput}
          onChange={handleChange}
        />
        <p>&nbsp;</p>
        <label htmlFor="newPassword" className={styles.passwordFormLabel}>
          Enter your new password
        </label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          className={styles.passwordFormInput}
          onChange={handleChange}
        />
        <p>&nbsp;</p>
        <label htmlFor="newPassword2" className={styles.passwordFormLabel}>
          Confirm your new password
        </label>
        <input
          type="password"
          name="newPassword2"
          value={newPassword2}
          className={styles.passwordFormInput}
          onChange={handleChange}
        />
        <p>&nbsp;</p>
        <input
          type="submit"
          value="Submit"
          className={styles.passwordFormSubmit}
        />
      </form>
      <br />
      {adminControl() ? (
        <>
          <strong>Change User Password:</strong>
          <form className={styles.passwordForm} onSubmit={submitAdmin}>
            <label className={styles.passwordFormLabel}>
              User Being Changed
            </label>
            <input
              type="text"
              value={userName}
              className={styles.passwordFormInput}
              onChange={changeUserName}
            />
            <p>&nbsp;</p>
            <label className={styles.passwordFormLabel}>New Password</label>
            <input
              type="password"
              value={userNewPassword}
              className={styles.passwordFormInput}
              onChange={changeUserNewPassword}
            />
            <p>&nbsp;</p>
            <label className={styles.passwordFormLabel}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={userNewPassword2}
              className={styles.passwordFormInput}
              onChange={changeUserNewPassword2}
            />
            <p>&nbsp;</p>
            <input
              type="submit"
              value="Submit"
              className={styles.passwordFormSubmit}
            />
          </form>
        </>
      ) : (
        <></>
      )}
      <PopUpBox
        closePopUpBox={closePopUpBox}
        message={message}
        popUpBox={popUpBox}
      />
    </>
  );
};

export default PasswordUpdate;
