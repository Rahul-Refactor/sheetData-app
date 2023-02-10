import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "201324902169-v3v4ne14cne6sb3vvgaltkl1dfeqp34c.apps.googleusercontent.com";

const Logout = () => {
  const onSuccess = () => {
    alert("Logout Success");
    console.log("Log out sucessfully");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
