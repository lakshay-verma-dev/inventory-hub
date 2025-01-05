import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, px } from "framer-motion";
import "./FavoriteBook.css";
import favoritebook from "./favoritebook.jpg";
import { Link } from "react-router-dom";

function FavoriteBook() {
  return (
    <Container fluid className="favorite-book-container px-8">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={favoritebook}
              alt="Favorite Book"
              className="favbook-image"
            />
          </motion.div>
        </Col>
        <Col md={5} className="ml-5">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="favorite-book-heading font-bold">
              Find Your Favorite Book Here
            </h2>
            <p className="favorite-book-paragraph">
              Discover a vast collection of books that you can read, listen to,
              or download. Join our community and dive into the world of
              knowledge.
            </p>
            <ul className="favorite-book-tags">
              <li>
                <span>800+</span>
                <br /> Book Listening
              </li>
              <li>
                <span>550+ </span>
                <br /> Registered Users
              </li>
              <li>
                <span>1200+</span> <br /> PDF Downloaders
              </li>
            </ul>
            <Button className="explore-more-button" variant="primary">
              <Link to={"/shop"}>Explore More</Link>
            </Button>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default FavoriteBook;
