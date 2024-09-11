import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useFirebase } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user,loading } = useFirebase();
   const location = useLocation();
  //  const loading = false
  //  const user = true
  if (loading) {
    return (
      <div className="text-center">
        {" "}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
