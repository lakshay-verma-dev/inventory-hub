import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./FooterComponents.css";

const FooterComponents = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="justify-content-between px-8 py-4">
          <Col md={3}>
            <h5>
              <FaMapMarkerAlt className="me-2" />
              About Us
            </h5>
            <p className="text-white">
              We are dedicated to helping users find the best books and
              resources. Stay connected with us through our social media
              channels.
            </p>
          </Col>
          <Col md={2}>
            <h5>
              <FaEnvelope className="me-2" />
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#shop">Shop</a>
              </li>
              <li>
                <a href="#sell">Dashboard</a>
              </li>
              <li>
                <a href="#sitemap">Sitemap</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>
              <FaPhoneAlt className="me-2" />
              Support
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled contact-info">
              <li>
                <FaEnvelope className="me-2" />
                Email:{" "}
                <a href="mailto:info@carrepair.com">info@bookstore.com</a>
              </li>
              <li>
                <FaPhoneAlt className="me-2" />
                Phone: +1 (555) 123-4567
              </li>
              <li>
                <FaMapMarkerAlt className="me-2" />
                Address: 123 BookStore, AutoCity, AC 12345
              </li>
            </ul>
            <Form className="newsletter-form mt-3">
              <Form.Group controlId="formNewsletter">
                <Form.Control
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="bg-white h-9"
                />
              </Form.Group>
              <Button  variant="outline-light h-9" style={{borderRadius:"0"}}>
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="border-t-2 foot2 px-8 pt-3">
          <Col className="flex flex-wrap justify-between align-items-center">
            <p className="text-white font-semibold mb-0">
              &copy; 2024 BookInventory. All rights reserved.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/lakshay_.verma_/"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/lakshay-verma-b70b42301/"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>
        {/* <Button
          variant="outline-light"
          className="back-to-top"
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to Top
        </Button> */}
      </Container>
    </footer>
  );
};

export default FooterComponents;
