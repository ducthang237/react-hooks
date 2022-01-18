import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        (authTokens || localStorage.getItem("token")) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;