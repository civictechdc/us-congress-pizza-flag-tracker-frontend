import React, { useContext } from "react";

import { isUser } from "../components/permissions";
import LoginSubComponent from "../components/loginSubComponent";
import ProfileView from "../components/profileView";
import UserContext from "../components/userContext";

const Profile = () => {
  const { setUserDisplay } = useContext(UserContext);  // rerenders when user logs in

  return isUser() ? <ProfileView /> : <LoginSubComponent />;
};
export default Profile;
