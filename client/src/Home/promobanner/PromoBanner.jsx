import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./PromoBanner.css";
import awardbooks from "./awardbooks.png";

function PromoBanner() {
  const ref = useRef()
  return (
    <Container ref={ref} fluid className="promo-banner-container px-8">
      <Row className="align-items-center">
        <Col md={6}>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="promo-text"
          >
            <h2 className="font-semibold">2023 National Book Awards for Fiction Shortlist</h2>
            <Button className="promo-button" variant="light">
              Get Promo Code
            </Button>
          </motion.div>
        </Col>
        <Col md={2}></Col>
        <Col md={4}>
          <motion.div
            // drag
            // dragConstraints={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="promo-image-container"
          >
            <img
              src={awardbooks}
              alt="Book Awards"
              className="promo-image"
            />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default PromoBanner;
