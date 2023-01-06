import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

const DashBoard = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  return (
    <div>
      <NavBar />
      {currentUser.name}
    </div>
  );
};

export default DashBoard;
