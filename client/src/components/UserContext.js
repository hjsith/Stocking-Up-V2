import React from "react";

const userContext = React.createContext({
  user: {},
  updateUser: (newUser, newID) => {}
});

export { userContext as UserContext };
