import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import signup from "./signup.jpg";
import { FaArrowLeft } from "react-icons/fa";
import {
  verifyOtp,
  resetPassword,
  forgotPassword,
  verifyRestOtp,
} from "../../Api/UserApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState("enterEmail"); // 'enterEmail', 'enterOtp', 'enterNewPassword'

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsLoading(true);
      try {
        await forgotPassword({ email });
        toast.success("OTP sent to your email!");
        setStep("enterOtp");
        setErrors("");
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "Failed to send OTP. Please try again.";
        toast.error(errorMessage);
        setErrors(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors("OTP is required");
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyRestOtp({ email, otp });
      toast.success("OTP verified successfully!");
      setStep("enterNewPassword");
      setErrors("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      setErrors(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setErrors("New password is required");
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword({ email, newPassword });
      toast.success("Password reset successfully! Redirecting to login...");
      // setStep("enterEmail");
      setEmail("");
      setOtp("");
      setNewPassword("");
      setErrors("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      setErrors(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = () => {
    if (!email) {
      setErrors("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors("Invalid email format");
      return false;
    }
    setErrors("");
    return true;
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
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
                  {step === "enterEmail"
                    ? "Reset Your Password"
                    : step === "enterOtp"
                    ? "Verify OTP"
                    : "Set New Password"}
                </h1>
                <Form
                  onSubmit={
                    step === "enterEmail"
                      ? handleSendOtp
                      : step === "enterOtp"
                      ? handleVerifyOtp
                      : handleResetPassword
                  }
                >
                  {step === "enterEmail" && (
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        isInvalid={!!errors}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {step === "enterOtp" && (
                    <Form.Group controlId="formOtp">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the OTP sent to your email"
                        value={otp}
                        onChange={handleChange(setOtp)}
                        isInvalid={!!errors}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {step === "enterNewPassword" && (
                    <Form.Group controlId="formNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={handleChange(setNewPassword)}
                        isInvalid={!!errors}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  {isLoading && (
                    <div className="text-center">
                      <Spinner animation="border" variant="light" />
                    </div>
                  )}

                  <Button
                    variant="success"
                    type="submit"
                    className="signup-button mt-3"
                    disabled={isLoading}
                  >
                    {step === "enterEmail"
                      ? "Send OTP"
                      : step === "enterOtp"
                      ? "Verify OTP"
                      : "Reset Password"}
                  </Button>

                  {step === "enterEmail" && (
                    <Link to="/login" className=" already">
                      <div className="flex mt-4">
                        <FaArrowLeft className="me-2 mt-1" /> Back to Login
                      </div>
                    </Link>
                  )}
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
