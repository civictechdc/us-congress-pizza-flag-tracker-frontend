import { createContext, useState, useContext, useMemo } from "react";

const UserContext = createContext({
  userDisplay: "",
  setUserDisplay: () => {},
});

export default UserContext;
