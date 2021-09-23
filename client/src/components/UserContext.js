import React from "react";

const userContext = React.createContext({
  user: {},
  updateUser: newUser => {}
});

export { userContext as UserContext };
