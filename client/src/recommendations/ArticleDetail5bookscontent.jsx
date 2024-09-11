import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import contentcopy from "./images/contentcopy.jpeg";
import crushing from "./images/crushing.jpeg";
import contagious from "./images/contagious.jpeg";
import booming from "./images/booming.jpeg";
import superfan from "./images/superfan.jpeg";
import steal from "./images/steal.jpeg";
import "./css.css";
import React, { useEffect } from "react";

const ArticleDetail5bookscontent = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="article-detail-container mt-24">
      <button
        className="button-back"
        onClick={handleBackClick}
        whileHover={{ scale: 1.1 }}
      >
        <FaArrowLeft size={24} /> Back
      </button>
      <h1>5 Best Books for Content Creators</h1>
      <div className="author-section">
        <img
          src={contentcopy}
          alt="Books for Content Creators"
          className="author-image"
        />
        <p>
          Explore the top recommendations for content creators with insights on
          writing, creativity, and making shareable content.
        </p>
      </div>
      <Row className="book-list">
        {/* Book 1 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={crushing}
                className="article-image"
                alt="Crushing It! by Gary Vaynerchuk"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  1 - Crushing It! By Gary Vaynerchuk
                </Card.Title>
                <Card.Text className="card-text">
                  Gary Vaynerchuk is the author of the entrepreneurial and
                  motivational book "Crushing It!"...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/example1"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 2 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={contagious}
                className="article-image"
                alt="Contagious by Jonah Berger"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  2 - Contagious by Jonah Berger
                </Card.Title>
                <Card.Text className="card-text">
                  A product or content going viral is not a game of luck but
                  pure strategy and hard work...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/example2"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 3 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={booming}
                className="article-image"
                alt="Booming Digital Stars by Harsh Pamnani"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  3 - Booming Digital Stars by Harsh Pamnani
                </Card.Title>
                <Card.Text className="card-text">
                  A very interesting book of our favorite and very popular
                  digital stars...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/example3"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 4 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={superfan}
                className="article-image"
                alt="Superfans by Pat Flynn"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  4 - Superfans by Pat Flynn
                </Card.Title>
                <Card.Text className="card-text">
                  Pat is an author, podcaster, social media expert, and someone
                  who has been featured in...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/example4"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 5 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={steal}
                className="article-image"
                alt="Steal Like an Artist by Austin Kleon"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  5 - Steal Like an Artist by Austin Kleon
                </Card.Title>
                <Card.Text className="card-text">
                  Everyone in the creative world, be it an artist, writer, or
                  designer, must read this book...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/example5"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArticleDetail5bookscontent;
