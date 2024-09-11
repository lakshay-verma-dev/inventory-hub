import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import signup from "./signup.jpg";
import { useFirebase } from "../../provider/AuthProvider";

const Login = () => {
  const firebase = useFirebase();
  console.log("firebase", firebase);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [firebaseError, setFirebaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let isValid = true;
    const newErrors = {};

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      firebase
        .signInWithEmailAndPasswordHandler(formData.email, formData.password)
        .then((value) => {
          toast.success("Login Successful!");
          console.log("Success! ", value);
          setFormData({ email: "", password: "" });
          setErrors({ email: "", password: "" });
          setFirebaseError("");
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.log("Error during login", err);
          setFirebaseError("User not Found, Check Your Data");
          toast.error("Login failed. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error("Please correct the errors in the form.");
    }
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
       toast.error(
         "An error occurred during Google Sign-In. Please try again."
       );
     }
   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setFirebaseError("");
  };
   const handleBackClick = () => {
     navigate("/"); // Go back to the previous page
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
      <div style={{ minWidth: "40%" }}>
        <Container className="signup-container bg-transparent">
          <Row>
            <Col md={12} className="right-container mt-2">
              <button className="button-back" onClick={handleBackClick}>
                <FaArrowLeft size={18} />
              </button>
              <div className="flex justify-center">
                <FaUser className="user-icon" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <h1 className="font-semibold text-white">Login Here</h1>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      className="mb-2"
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {isLoading && (
                    <div className="text-center">
                      <Spinner animation="border" variant="light" />
                    </div>
                  )}

                  {!isLoading && firebaseError && (
                    <div className="alert alert-danger mt-3">
                      {firebaseError}
                    </div>
                  )}
                  <br />
                  <p>
                    <Link to="/forgot" className="already">
                      Forgot Password?
                    </Link>
                  </p>

                  <Button
                    variant="success"
                    type="submit"
                    className="signup-button"
                    disabled={isLoading}
                  >
                    Login
                  </Button>

                  <div className="text-center mt-3">
                    <p>
                      If you don't have an account?{" "}
                      <Link to={"/sign-up"} className="already">
                        Sign Up
                      </Link>{" "}
                      Here{" "}
                    </p>
                  </div>
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

export default Login;
