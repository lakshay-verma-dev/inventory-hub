import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import "./SignUp.css";
import signup from "./signup.jpg";
import { useFirebase } from "../../provider/AuthProvider";
import ReCAPTCHA from "react-google-recaptcha";

// import {setDoc}

const SignUp = () => {
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
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
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { user, loading } = useFirebase();

  // useEffect(() => {
  //   if (user) {
  //     if (user.emailVerified) {
  //       toast.success("Email verified successfully!");
  //       navigate(from, { replace: true });
  //     } else {
  //       setIsVerified(false);
  //     }
  //   }
  // }, [user, navigate, from]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (!recaptchaToken) {
        toast.error("Please complete the reCAPTCHA.");
        return;
      }

      setIsLoading(true);
      try {
        const userCred = await firebase.signUpWithUserNameandPassword(
          formData.email,
          formData.password
        );
        const user = userCred.user;
        await firebase.sendEmailVerification(user);
        console.log(user);
        setVerificationSent(true);
        setIsLoading(false);
        setFirebaseError("");
        setRecaptchaToken("");
        toast.success("Verification email sent! Please verify your email.");
      } catch (err) {
        console.error("Error during sign-up:", err);
        setIsLoading(false);
        if (err.code === "auth/email-already-in-use") {
          setFirebaseError(
            "This email is already in use. Please try logging in."
          );
        } else {
          setFirebaseError(
            "An error occurred during sign-up. Please try again."
          );
        }
        toast.error("An error occurred during sign-up. Please try again.");
      }
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setFirebaseError(""); // Reset Firebase error on input change
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await firebase.loginWithGoogle();
      toast.success("Google Sign-In Successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Error during Google Sign-In:", err);
      setIsLoading(false);
      setFirebaseError(
        "An error occurred during Google Sign-In. Please try again."
      );
      toast.error("An error occurred during Google Sign-In. Please try again.");
    }
  };

  const onChangeCaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const handleVerifyEmail = async () => {
    toast.success("Please verify your email.");
    navigate(from, { replace: true });
  };

  const handleBackToSignUp = () => {
    setVerificationSent(false); // Reset to show the sign-up form again
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
              <h1
                className="md:text-7xl sm:text-5xl xsm:text-3xl text-white"
                style={{ textAlign: "left" }}
              >
                Welcome!
              </h1>
              <div className="w-[17%] border-b-2" />
              <p className="mt-4">
                Welcome to our vibrant community! By signing up, you unlock
                access to a world of opportunities tailored just for you.
              </p>

              <Button className="learn-more-button">
                <Link to={"/"}>Learn More</Link>
              </Button>
              {/* <br /> */}
              <Button
                variant="outline-light"
                className="ml-3 continue-without-account-btn"
                onClick={handleContinueWithoutAccount}
                // style={}
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
                    <ReCAPTCHA
                      sitekey="6LcHuTIqAAAAALM_mxJdYJ1Fblu5gwv5rR2EF2JP"
                      onChange={onChangeCaptcha}
                      className="mt-3"
                    />
                  </Form.Group>
                  {/* Display Firebase Error if it exists */}
                  {firebaseError && (
                    <div className="alert alert-danger mt-3">
                      {firebaseError}
                    </div>
                  )}

                  {/* Display Loader if loading */}
                  {isLoading && (
                    <div className="text-center mt-3">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}

                  <Button
                    variant="success"
                    type="submit"
                    className="signup-button"
                    disabled={isLoading} // Disable button while loading
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
                <Button
                  variant="light"
                  className="google-signin-button mt-2"
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    // src={googlelogo}
                    alt="Google logo"
                    className="google-logo mr-2"
                  />
                  Sign in with Google
                </Button>
              </motion.div>
            ) : (
              <div className="text-center mt-4">
                <h2 className="text-4xl font-semibold">
                  Email Verification Sent
                </h2>
                <p className="text-white mt-4">
                  We've sent a verification email to{" "}
                  <strong className="already">{formData.email}</strong>. Please
                  verify your email and then log in.
                </p>
                <Button
                  onClick={handleVerifyEmail}
                  className="signup-button"
                  // style={{ minWidth: "150px" }}
                >
                  Verify Email
                </Button>
                <div className="text-left">
                  {" "}
                  <Button
                    variant="link"
                    className="text-left text-decoration-none d-flex"
                    onClick={handleBackToSignUp}
                  >
                    <FaArrowLeft className="mt-1 mr-1" />
                    Back to Sign Up
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
