import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice"; // Redux action
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // React Icons
import "react-toastify/dist/ReactToastify.css";
import "./Logout.css";

const Logout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display a success message
    toast.success("You have been logged out successfully. See you soon!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Clear user data and navigate after toast
    setTimeout(() => {
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Ensure token is removed if stored separately
      navigate("/"); // Redirect to the login page
    }, 2000);
  };

  return (
    <Container className="logout-container mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="logout-heading">
              Goodbye, {user?.firstName} {user?.lastName}!
            </h1>
            <p className="logout-subheading">
              Thank you for visiting. We hope to see you again soon!
            </p>

            <Card className="user-details-card my-4 mx-auto">
              <Card.Body>
                <Card.Title>Your Details</Card.Title>
                <Card.Text>
                  <b>Email:</b> {user?.email || "N/A"}
                </Card.Text>
                <Card.Text>
                  <b>Membership:</b> {user?.membership || "Standard"}
                </Card.Text>
              </Card.Body>
            </Card>

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

      {/* Additional Content */}
      <Row className="logout-additional-content mt-5">
        <Col md={8} className="text-center mx-auto">
          <h2 className="text-secondary">Stay Connected!</h2>
          <p className="text-muted">
            Follow us on social media to stay updated on the latest news and
            updates.
          </p>
          <div className="social-icons d-flex justify-content-center gap-4">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaFacebook size={32} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaTwitter size={32} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }}>
              <FaInstagram size={32} />
            </motion.div>
          </div>
        </Col>
      </Row>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default Logout;
