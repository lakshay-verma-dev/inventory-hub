import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css.css";
import selfhelpcopy from "./images/selfhelpcopy.jpeg";
import doepicshit from "./images/doepicshit.jpeg";
import doittoday from "./images/doittoday.jpeg";
import gopaldas from "./images/gopaldas.jpeg";
import magicinyou from "./images/magicinyou.jpeg";
import React, { useEffect } from "react";

const ArticleDetail4BestSelfhelp = () => {
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
      <h1>4 Best Self-Help Books for Beginners</h1>
      <div className="author-section">
        <img
          src={selfhelpcopy}
          alt="Self-Help Books Cover"
          className="author-image"
        />
        <p>
          Thinking to start reading self-help books? Check out these 4 simple
          and popular books that are a good pick for beginners.
        </p>
      </div>
      <Row className="book-list">
        {/* Book 1 */}
        <Col md={6} lg={3} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={doepicshit}
                className="article-image"
                alt="Do Epic Shit by Ankur Warikoo"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Do Epic Shit by Ankur Warikoo
                </Card.Title>
                <Card.Text className="card-text">
                  Author <strong>Ankur Warikoo</strong> is an entrepreneur and
                  content creator known for his deep, witty, and brutally honest
                  thoughts on success, failure, money, investing,
                  self-awareness, and personal relationships. In his first book,
                  Ankur compiles key ideas that have fueled his journey,
                  covering topics from creating habits for long-term success to
                  embracing and accepting failure.
                </Card.Text>
                <a
                  href="https://www.amazon.in/dp/9391165486"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 2 */}
        <Col md={6} lg={3} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={doittoday}
                className="article-image"
                alt="Do It Today by Darius Foroux"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Do It Today by Darius Foroux
                </Card.Title>
                <Card.Text className="card-text">
                  In this book, Darius Foroux shares 30 of his best articles to
                  help you overcome procrastination, improve productivity, and
                  achieve more. He delves into personal experiences and provides
                  actionable advice on how to lead a productive and meaningful
                  life by tackling procrastination head-on.
                </Card.Text>
                <a
                  href="https://www.amazon.in/dp/B07L5YM7QW"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 3 */}
        <Col md={6} lg={3} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={gopaldas}
                className="article-image"
                alt="Life's Amazing Secrets by Gaur Gopal Das"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Life's Amazing Secrets by Gaur Gopal Das
                </Card.Title>
                <Card.Text className="card-text">
                  Gaur Gopal Das shares profound insights on how to find balance
                  and purpose in life. Through a journey of conversations, he
                  touches upon strengthening relationships, discovering true
                  potential, succeeding at work, and contributing back to the
                  world, all while navigating through everyday challenges.
                </Card.Text>
                <a
                  href="https://www.amazon.in/dp/0143442295"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Book 4 */}
        <Col md={6} lg={3} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={magicinyou}
                className="article-image"
                alt="The Magic in You by Deepa Rajani"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Magic in You by Deepa Rajani
                </Card.Title>
                <Card.Text className="card-text">
                  Deepa Rajani explores the untapped power of the human mind and
                  encourages readers to believe in their ability to shape their
                  own destinies. This book serves as a guide to awakening your
                  soul and realizing the boundless energy within to overcome
                  adversities and attract positivity.
                </Card.Text>
                <a
                  href="https://www.amazon.in/dp/9382665714"
                  className="buy-button"
                  target="_blank"
                  rel="noopener noreferrer"
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

export default ArticleDetail4BestSelfhelp;
