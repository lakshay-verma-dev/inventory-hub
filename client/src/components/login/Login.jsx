import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import signup from "./signup.jpg";
import { loginUser } from "../../Api/UserApi";
import  { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Clear form data on mount to ensure no pre-filled values
    setFormData({ email: "", password: "" });
  }, []);

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

  // Import jwt-decode to decode the token

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validate(formData, setErrors)) {
      setIsLoading(true);
      try {
        const response = await loginUser(formData);
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        const { firstName, lastName, email } = decodedToken;

        const userData = { token, user: { firstName, lastName, email } };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(setUser(userData));

        toast.success("Login successful! Redirecting to home...");
        setTimeout(() => navigate(from, { replace: true }), 2000);

        setFormData({ email: "", password: "" });
        setErrors({ email: "", password: "" });
      } catch (error) {
        console.error(error);
        const errorMessage =
          error.response?.data?.error ||
          "An error occurred during log in. Please try again later.";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please correct the errors in the form.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
              <button className="button-back text-white" onClick={handleBackClick}>
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
                <Form autoComplete="off" onSubmit={handleLogin}>
                  <input
                    type="text"
                    style={{ display: "none" }}
                    autoComplete="off"
                  />
                  <input
                    type="password"
                    style={{ display: "none" }}
                    autoComplete="new-password"
                  />

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      autoComplete="off"
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
                      autoComplete="off"
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
                  {/* <Button variant="light" className="google-signin-button mt-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                      alt="Google logo"
                      className="google-logo mr-2"
                    />
                    Sign in with Google
                  </Button> */}
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
