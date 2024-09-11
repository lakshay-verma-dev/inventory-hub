import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import "./recommed.css";
import { recommendation } from "./data";
import React,{ useEffect } from "react";

const Recommendations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container fluid className="recommendations-container mt-24">
      <motion.h1
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-center mb-4 font-bold text-5xl"
      >
        Editor’s Choice: Top Reads for You
      </motion.h1>
      <p className="text-center mb-5">
        Find your next read here{" "}
        <span role="img" aria-label="check">
          ✅
        </span>
      </p>
      <Row>
        {recommendation.map(({ id, image, title, description, link }) => (
          <Col xs={12} md={6} lg={4} key={id} className="mb-4">
            <div
              // whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="recommendation-card-wrapper"
            >
              <Card
                className="recommendation-card border-0 shadow-lg"
                style={{ width: "30rem" }}
              >
                <Card.Img
                  variant="top"
                  src={image}
                  alt={title}
                  className="img-fluid card-image"
                />
                <Card.Body className="card-text-content p-3">
                  <div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card.Title className="d-flex align-items-center mb-3 text-black text-sm">
                      <FaBookOpen className="me-2" /> {title}
                    </Card.Title>
                  </div>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text className="additional-text">
                    Dive deeper into the world of {title}. Discover insights,
                    analysis, and much more!
                  </Card.Text>
                  <motion.div className="mt-3">
                    {/* <motion.div whileHover={{ scale: 1.01 }}> */}
                    <Link to={link}>
                      <Button variant="primary" className="read-more">
                        Read Full Article
                      </Button>
                    </Link>
                    {/* </motion.div> */}

                    <Button variant="outline-secondary" className="ms-2">
                      Save for Later
                    </Button>
                  </motion.div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Recommendations;
