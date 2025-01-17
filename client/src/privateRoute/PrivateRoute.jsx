import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  // console.log("userData", user);
  var loading = 0;
  var userData = 0;
  if (user.email == null) {
    loading = 1;
  } else {
    userData = 1;
  }

  // console.log("bool", userData);
  // if (loading) {
  //   return (
  //     <div className="text-center">
  //       {" "}
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   );
  // }
  if (userData) {
    return children;
  }
  if (!userData) {
    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
  }
};

export default PrivateRoute;
