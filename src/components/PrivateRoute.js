// PrivateRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth(); // Access currentUser from AuthProvider

  return (
    <Route
      {...rest} // Spread other props like 'path' and 'exact' from Route
      render={(props) => {
        return currentUser ? ( // If currentUser exists, render the Component
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Otherwise, redirect to the login page
        );
      }}
    />
  );
};

export default PrivateRoute;
