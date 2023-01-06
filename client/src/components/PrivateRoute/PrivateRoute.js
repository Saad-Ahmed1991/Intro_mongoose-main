import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  return <>{token ? props.children : <Navigate to="/signin" />}</>;
};

export default PrivateRoute;
