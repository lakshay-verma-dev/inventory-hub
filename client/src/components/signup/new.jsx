import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import "./SignUp.css";
import signup from "./signup.jpg";
import { useFirebase } from "../../provider/AuthProvider";
import ReCAPTCHA from "react-google-recaptcha";

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

        setVerificationSent(true); // Set to true after successful sign-up
        setIsLoading(false);
        setFirebaseError("");
        setRecaptchaToken("");
        toast.success("Verification email sent! Please verify your email.");
      } catch (err) {
        setIsLoading(false);
        setFirebaseError("An error occurred during sign-up. Please try again.");
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

  const handleVerifyEmail = async () => {
    toast.success("Please verify your email.");
  };

  const handleBackToSignUp = () => {
    setVerificationSent(false); // Reset to show the sign-up form again
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
              <h1 className="md:text-7xl sm:text-5xl xsm:text-3xl text-white">
                Welcome!
              </h1>
              <p className="mt-4">
                Welcome to our vibrant community! By signing up, you unlock
                access to a world of opportunities tailored just for you.
              </p>

              <Button className="learn-more-button">
                <Link to={"/"}>Learn More</Link>
              </Button>
            </motion.div>
          </Col>

          <Col md={5} className="right-container mt-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {!verificationSent ? (
                <>
                  <h1 className="font-semibold text-white">Sign Up</h1>

                  <Form onSubmit={handleSignUp}>
                    {/* Form fields for firstName, lastName, email, password */}
                    {/* Add reCAPTCHA, error handling, and spinner */}
                    <Button
                      variant="success"
                      type="submit"
                      className="signup-button"
                      disabled={isLoading}
                    >
                      Sign Up
                    </Button>
                  </Form>
                </>
              ) : (
                <div className="verify-email-section">
                  <h2>Email Verification Sent</h2>
                  <p>
                    We've sent a verification email to {formData.email}. Please
                    verify your email and then log in.
                  </p>
                  <Button onClick={handleVerifyEmail}>Verify Email</Button>
                  <Button variant="link" onClick={handleBackToSignUp}>
                    Back to Sign Up
                  </Button>
                </div>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
