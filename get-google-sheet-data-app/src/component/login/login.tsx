import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "201324902169-v3v4ne14cne6sb3vvgaltkl1dfeqp34c.apps.googleusercontent.com";

const Login = () => {
  const onLoginSuccess = (res: any) => {
    console.log("Login Success", res.profileObj);
  };
  const onLoginFailure = (res: any) => {
    console.log("Login Failed", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
