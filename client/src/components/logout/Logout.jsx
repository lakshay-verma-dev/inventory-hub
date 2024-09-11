import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Logout.css"; // Create your custom CSS file for extra styling
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../../provider/AuthProvider";


const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {logOut,user} = useFirebase()
  const from = location.state?.from?.pathname || "/";
  // Function to handle the logout process
  const handleLogout = () => {
    // Displaying a Toastify notification
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    logOut()
    navigate(from, { replace: true });

    // Simulate logout process
    setTimeout(() => {
      console.log("User logged out");
      // Redirect or perform further actions here
    }, 3000);
    navigate(from, { replace: true });
  };

  return (
    <Container className="logout-container mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to Leave?</h2>
            <p>We hope to see you again soon!</p>
            <Image
              src={user?.photoURL}
              roundedCircle
              className="logout-image mb-4"
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="logout-button"
              >
                Log Out
              </Button>
            </motion.div>
          </motion.div>
        </Col>
      </Row>

      {/* Toastify Container */}
      <ToastContainer />
    </Container>
  );
};

export default Logout;
