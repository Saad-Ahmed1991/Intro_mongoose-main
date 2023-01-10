import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  return (
    <>
      {!currentUser.role ? (
        <h1>Loading...</h1>
      ) : currentUser.role == "admin" ? (
        props.children
      ) : (
        <Navigate to={-1} />
      )}
    </>
  );
};

export default ProtectedRoute;
