import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { color, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { signupRoute, verifyOtp } from "../../Api/UserApi";
import signup from "./signup.jpg";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { jwtDecode } from "jwt-decode";
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (!recaptchaToken) {
        toast.error("Please complete the reCAPTCHA.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await signupRoute({ email: formData.email });
        setVerificationSent(true);
        setIsLoading(false);
        setRecaptchaToken("");
        toast.success(
          `OTP has been sent to your email ${formData.email} . It will expire in 5 minutes. Please enter it to verify your account.`
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "An error occurred during sign-up. Please try again later.";
        toast.error(errorMessage);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please correct the errors in the form and try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
    setOTPError("");
  };

  const onChangeCaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const dispatch = useDispatch();
  // Import for decoding JWT

 const handleVerifyEmail = async () => {
    if (!otp) {
      setOTPError("OTP is required.");
      toast.error("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp({ ...formData, otp });
      const token = response.data.token;

      const userData = {
        token,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      dispatch(setUser(userData));

      toast.success("Email verified successfully! Redirecting to home...");
      setTimeout(() => navigate("/"), 3000);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setOTP("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to verify the OTP. Please try again.";
      toast.error(errorMessage);
      setOTPError(errorMessage);
      console.error("Error during OTP verification:", error);
    } finally {
      setIsLoading(false);
    }
 };
  const handleBackToSignUp = () => {
    setVerificationSent(false);
  };

  const handleContinueWithoutAccount = () => {
    navigate("/");
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
      }}
    >
      <Container className="signup-container bg-transparent">
        <Row>
          <Col md={7} className="left-container bg-transparent">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-white" style={{ textAlign: "left" }}>
                Welcome!
              </h1>
              <p className="mt-4 text-white">
                Welcome to our vibrant community! By signing up, you unlock
                access to a world of opportunities tailored just for you.
              </p>

              <Button className="learn-more-button text-white">
                Learn More
              </Button>
              <Button
                variant="outline-light"
                className="ml-3 continue-without-account-btn"
                onClick={handleContinueWithoutAccount}
              >
                Continue without an account
              </Button>
            </motion.div>
          </Col>

          <Col md={5} className="right-container mt-2">
            {!verificationSent ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="flex justify-center">
                  <FaUser className="user-icon" />
                </div>
                <h1 className="font-semibold text-white">Sign Up</h1>

                <Form onSubmit={handleSignUp}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                          className="mb-2 py-1"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                          className="mb-2 py-1"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      className="mb-2 py-1"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      className="mb-2 py-1"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <ReCAPTCHA
                    sitekey="6LcHuTIqAAAAALM_mxJdYJ1Fblu5gwv5rR2EF2JP"
                    onChange={onChangeCaptcha}
                    className="mt-3"
                  />

                  {isLoading && (
                    <div className="text-center mt-3">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}

                  <Button
                    variant="success"
                    type="submit"
                    className="signup-button"
                    disabled={isLoading}
                  >
                    Sign Up
                  </Button>
                  <div className="text-center mt-2">
                    <p>
                      Already have an account?{" "}
                      <Link to={"/login"} className="already">
                        Login
                      </Link>{" "}
                      Here{" "}
                    </p>
                  </div>
                </Form>
              </motion.div>
            ) : (
              <div className="text-center mt-4">
                <h2 className="text-4xl font-semibold">
                  Email Verification Sent
                </h2>
                <p className="text-white mt-4">
                  We've sent a 6-digit OTP to your email address
                  <strong className="already"> {formData.email}</strong>. Please
                  enter it below to verify your account. The OTP will expire in
                  5 minutes.
                </p>
                <br />
                <Form.Group controlId="formOTP">
                  <Form.Control
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={handleOTPChange}
                    isInvalid={!!otpError}
                    className="mb-2 py-1"
                  />
                  <Form.Control.Feedback type="invalid">
                    {otpError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  onClick={handleVerifyEmail}
                  className="signup-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <div className="text-left">
                  <Button
                    variant="link"
                    className="text-decoration-none d-flex text-white mt-1"
                    style={{ color: "#f5da72" }}
                    onClick={handleBackToSignUp}
                  >
                    <span
                      style={{ color: "#f5da72" }}
                      className="hover:underline d-flex"
                    >
                      <FaArrowLeft className="mt-1 mr-1" />
                      Back to Sign Up
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
