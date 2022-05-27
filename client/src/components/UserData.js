import React from "react";

const UserData = React.createContext({
  session: {
    access_token: "",
    personal: {
      id: "",
      name: "",
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      signedUpAt: "",
    },
    isLoggedIn: false,
  },
  setSession: () => {},
});

export default UserData;
