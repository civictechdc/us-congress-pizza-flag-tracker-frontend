import { createContext } from "react";

const UserContext = createContext({
  setUserDisplay: () => {},
});

export default UserContext;
