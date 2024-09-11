import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  FaRegUser,
  FaBook,
  FaUsers,
  FaTachometerAlt,
  FaFacebook,
FaInstagram,FaLinkedin,FaTwitter} from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './About.css'; // Custom CSS file

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container fluid className="about-section p-3 mt-[5%]">
      <Row className="text-center mb-5">
        <Col>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-title font-bold text-5xl"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-subtitle"
          >
            Discover our story and what drives us.
          </motion.p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-mission"
          >
            <h2 className="font-semibold text-2xl">Our Mission</h2>
            <p className="mt-2">
              We are dedicated to nurturing a love for reading and providing a
              diverse range of books. Our goal is to be a community hub for book
              lovers.
            </p>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-history"
          >
            <h2 className="font-semibold text-2xl">Our History</h2>
            <p className="mt-2">
              Since [Year], we've been serving the community with a passion for
              books. From our humble beginnings to now, we've grown into a
              beloved local bookstore.
            </p>
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-values"
          >
            <h2 className="font-semibold text-2xl">
              <FaRegUser className="about-icon" /> Our Values
            </h2>
            <ul>
              <li>Supporting local talent</li>
              <li>Promoting literacy</li>
              <li>Encouraging community engagement</li>
            </ul>
          </motion.div>
        </Col>
        <Col md={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-team"
          >
            <h2 className="font-semibold text-2xl">
              <FaUsers className="about-icon" /> Meet the Team
            </h2>
            <Row>
              <Col md={4}>
                <Card className="team-member">
                  <Card.Img variant="top" src="team-member1.jpg" />
                  <Card.Body>
                    <Card.Title>John Doe</Card.Title>
                    <Card.Text>Founder & CEO</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="team-member">
                  <Card.Img variant="top" src="team-member2.jpg" />
                  <Card.Body>
                    <Card.Title>Jane Smith</Card.Title>
                    <Card.Text>Manager</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="team-member">
                  <Card.Img variant="top" src="team-member3.jpg" />
                  <Card.Body>
                    <Card.Title>Emily Johnson</Card.Title>
                    <Card.Text>Book Curator</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-community"
          >
            <h2 className="font-semibold text-2xl">
              <FaTachometerAlt className="about-icon" /> Community Engagement
            </h2>
            <p>
              We actively participate in local events and support initiatives
              that promote reading and literacy.
            </p>
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-analytics"
          >
            <h2 className="font-semibold text-2xl">
              <FaTachometerAlt className="about-icon" /> Analytics
            </h2>
            <Row>
              <Col md={3}>
                <Card className="analytics-card">
                  <div className="circle-progress">
                    <CircularProgressbar
                      value={70}
                      text={`${70}%`}
                      strokeWidth={10}
                      styles={{
                        path: {
                          stroke: "#4db6ac",
                        },
                        text: {
                          fill: "#4db6ac",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>Books Sold</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="analytics-card">
                  <div className="circle-progress">
                    <CircularProgressbar
                      value={85}
                      text={`${85}%`}
                      strokeWidth={10}
                      styles={{
                        path: {
                          stroke: "#ffca28",
                        },
                        text: {
                          fill: "#ffca28",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>Customer Satisfaction</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="analytics-card">
                  <div className="circle-progress">
                    <CircularProgressbar
                      value={90}
                      text={`${90}%`}
                      strokeWidth={10}
                      styles={{
                        path: {
                          stroke: "#ff7043",
                        },
                        text: {
                          fill: "#ff7043",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>Community Events</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="analytics-card">
                  <div className="circle-progress">
                    <CircularProgressbar
                      value={60}
                      text={`${60}%`}
                      strokeWidth={10}
                      styles={{
                        path: {
                          stroke: "#64b5f6",
                        },
                        text: {
                          fill: "#64b5f6",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>New Releases</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-testimonials"
          >
            <h2 className="font-semibold text-2xl">
              <FaUsers className="about-icon" /> What Our Customers Say
            </h2>
            <Card className="testimonial-card">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    "An amazing place with an incredible selection of books and
                    a warm atmosphere. Highly recommended!"
                  </p>
                  <footer className="blockquote-footer">
                    <small>
                      Sarah Johnson,{" "}
                      <cite title="Source Title">Local Reader</cite>
                    </small>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-contact"
          >
           
            <Row className="text-center mb-5">
              <Col>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="contact-us-title font-bold text-5xl"
                >
                  Contact Us
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="contact-us-subtitle"
                >
                  We'd love to hear from you! Fill out the form below or reach
                  us via email or social media.
                </motion.p>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="contact-form"
                >
                  <h2 className="font-semibold text-2xl">Get in Touch</h2>
                  <Form>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                      />
                    </Form.Group>

                    <Form.Group controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Your message"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Send Message
                    </Button>
                  </Form>
                </motion.div>
              </Col>

              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="contact-details"
                >
                  <h2 className="font-semibold text-2xl">
                    Contact Information
                  </h2>
                  <p>
                    Email:{" "}
                    <a href="mailto:info@bookstore.com">info@bookstore.com</a>
                  </p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Address: 123 Bookstore St, Booktown, BK 12345</p>

                  <div className="social-icons mt-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="social-icon" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="social-icon" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="social-icon" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icon" />
                    </a>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;

