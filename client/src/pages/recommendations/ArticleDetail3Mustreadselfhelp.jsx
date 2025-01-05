import { useNavigate } from "react-router-dom";
import mustreadselfhelp from "./images/mustreadselfhelp.jpeg";
import breakthrough from "./images/breakthrough.jpeg";
import invisible from "./images/invisible.jpeg";
import bedazzle from "./images/bedazzle.jpeg";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css.css";
import React, { useEffect } from "react";

const ArticleDetail3Mustreadselfhelp = () => {
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
        whileHover={{ scale: 1.1 }} // Uncommented
      >
        <FaArrowLeft size={24} /> Back
      </button>
      <h1>#HiddenGems: 3 Must-Read Self-Help Books by Lesser-Known Authors</h1>
      <div className="author-section">
        <img
          src={mustreadselfhelp}
          alt="Cover of Hidden Gems Book"
          className="author-image"
        />
        <p>
          Here are 3 underrated self-help books that are just amazing! Transform
          your mindset with these hidden gems.
        </p>
      </div>
      <Row className="book-list">
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            {" "}
            {/* Uncommented */}
            <Card className="card">
              <Card.Img
                variant="top"
                src={breakthrough}
                className="article-image"
                alt="Cover of The Breakthrough"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Breakthrough by Megha Bajaj
                </Card.Title>
                <Card.Text className="card-text">
                  The Breakthrough is an account of the lives of 11 people who
                  believe in the power of dreams and prove that faith with
                  continuous hard work, will achieve these dreams...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B08V8Q5G8F"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={invisible}
                className="article-image"
                alt="Cover of The One Invisible Code"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The One Invisible Code by Sharat Sharma
                </Card.Title>
                <Card.Text className="card-text">
                  The book talks about how people are stuck in the circle of
                  mediocrity and unable to move up the ladder of success...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B08MVMXDM1"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={bedazzle}
                className="article-image"
                alt="Cover of Bedazzle"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Bedazzle By Sharnoly Khera
                </Card.Title>
                <Card.Text className="card-text">
                  Bedazzle is a book which will turn out to be a guide on how to
                  present yourself in public speaking, how to make an impression
                  on people...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B07Q2SH7S3"
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

export default ArticleDetail3Mustreadselfhelp;
