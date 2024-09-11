import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useFirebase } from "../../provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import signup from "./signup.jpg";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        await firebase.resetPassword(email);
        toast.success("Password reset email sent!");
      //   navigate("/login");
        setEmail("");
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("Error resetting password. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validate = () => {
    let isValid = true;
    let error = "";

    if (!email) {
      error = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = "Invalid email format";
      isValid = false;
    }

    setErrors(error);
    return isValid;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors("");
  };

  return (
    <div
      className="main"
      style={{
        display: "grid",
        placeItems: "center",
        backgroundImage: `url(${signup})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div style={{ minWidth: "40%" }}>
        <Container className="signup-container bg-transparent">
          <Row>
            <Col md={12} className="right-container mt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="font-semibold text-white">
                  Reset Your Password
                </h1>
                <Form onSubmit={handleResetPassword}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      isInvalid={!!errors}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="signup-button mt-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>

                  <Link
                    to="/login"
                    className="text-white d-flex align-items-center mt-3"
                  >
                    <FaArrowLeft className="me-2" /> Back to Login
                  </Link>
                </Form>
              </motion.div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </div>
  );
};

export default ForgotPassword;
