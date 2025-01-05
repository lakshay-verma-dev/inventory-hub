import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Bannerstyle.css";
import bilogo from "./bilogo.png";

const Banner = () => {
  return (
    <div className="search-banner px-5">
      <Container fluid>
        <Row className="align-items-center ">
          <Col md={6}>
            <Image
              src={bilogo}
              alt="Logo"
              className="banner-logo bg-transparent w-full"
            />

            {/* Logo Section */}
          </Col>
          <Col>
            <Row>
              <Col md={10}>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="banner-heading"
                >
                  Buy and Sell Your Books Here
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  className="banner-paragraph"
                >
                  Explore our extensive collection of inventory. Whether you're
                  looking for specific items or just browsing, use the search
                  below to find exactly what you need.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className=" text-center"
                >
                  <Form className="search-form mt-4 pl-10">
                    <Col className="flex">
                      <Form.Control
                        type="text"
                        placeholder="Search inventory..."
                        className="search-input h-12 "
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        className="search-button h-12"
                      >
                        Search
                      </Button>
                    </Col>
                  </Form>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
