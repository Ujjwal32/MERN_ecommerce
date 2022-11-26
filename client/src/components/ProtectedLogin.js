import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedLogin = ({ component: Component, ...rest }) => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser && loggedInUser.length !== 0) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default ProtectedLogin;
