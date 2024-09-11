import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
// import "./Success.css"; // Custom styles

const Success = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center"
      >
        <Row>
          <Col>
            <motion.div
              className="success-icon"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FaCheckCircle size={100} className="text-success mb-4" />
            </motion.div>
            <h1 className="text-success">Payment Successful!</h1>
            <p>
              Your order has been placed successfully. Thank you for shopping
              with us!
            </p>
            <Button as={Link} to="/shop" variant="primary" className="mt-4">
              Continue Shopping
            </Button>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Success;
