import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Row>
          <Col>
            <motion.h1
              className="display-4 text-danger mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Payment Canceled!
            </motion.h1>
            <p className="lead">
              It seems like you canceled your payment. Want to try again?
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/shop">
                <Button variant="warning" className="mt-3">
                  Return to Shop
                </Button>
              </Link>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Cancel;
