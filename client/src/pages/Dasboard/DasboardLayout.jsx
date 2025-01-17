import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    // console.log("asf", storedUserData);
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData.token && userData.user) {
          dispatch(setUser(userData));
        } else {
          console.error(
            "Invalid user data structure in localStorage:",
            userData
          );
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, [dispatch]);

  return (
    <div className="flex gap-60 xsm:gap-0 flex-col md:flex-row">
      <div>
        <SideBar />
      </div>
      <div className="md:m-3 sm:m-0 w-full ">
        <Outlet className="overflow-scroll" />
      </div>
    </div>
  );
};

export default DashboardLayout;
