import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show toast notification
    toast.error("Oops! Page not found. Redirecting to the previous page...", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    // Redirect user after 2 seconds
    const timer = setTimeout(() => {
      navigate(-1); // Go back to the previous page
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container className="text-center d-flex flex-column justify-content-center align-items-center h-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaExclamationTriangle className="text-red-500 text-7xl mb-4" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Go Back
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;
