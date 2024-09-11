import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css.css";
import drvikascopy from "./images/drvikascopy.jpg";
import sophie from "./images/sophie.jpeg";
import godan from "./images/godan.jpeg";
import myexperiments from "./images/myexperiments.jpeg";
import sapiens from "./images/sapiens.jpeg";
import history from "./images/history.jpeg";
import React, { useEffect } from "react";

const ArticleDetailDrVikas = () => {
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
        // whileHover={{ scale: 1.1 }}
      >
        <FaArrowLeft size={24} /> Back
      </button>
      <h1>5 Books Recommended By Dr. Vikas Divyakirti</h1>
      <div className="author-section">
        <img
          src={drvikascopy}
          alt="Dr. Vikas Divyakirti"
          className="author-image"
        />
        <p>
          Vikas Divyakirti is known for his simplicity and effective teaching,
          making him a top choice among UPSC trainers, widely recognized and
          admired. Here's a list of five books recommended by him that he
          believes everyone should read.
        </p>
      </div>
      <Row className="book-list">
        <Col md={4} className="book-item">
          <div
          // whileHover={{ scale: 1.05 }}
          >
            <Card className="card">
              <Card.Img variant="top" src={sophie} className="article-image" />
              <Card.Body>
                <Card.Title className="card-title">
                  Sophie's World By Jostein Gaarder
                </Card.Title>
                <Card.Text className="card-text">
                  The book is about a beautiful story of a young girl named
                  Sophie. While living a normal life, she stumbles upon an
                  extraordinary life by receiving a letter that makes her
                  question her life...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B002RI9KH6"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div
          // whileHover={{ scale: 1.05 }}
          >
            <Card className="card">
              <Card.Img variant="top" src={godan} className="article-image" />
              <Card.Body>
                <Card.Title className="card-title">
                  Godaan - By Munshi Premchand
                </Card.Title>
                <Card.Text className="card-text">
                  The very famous Indian novelist Munshi Premchand is the author
                  of this classic book - Godaan. Published in 1936, Godaan is
                  made from two words, Gow and Daan...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B07YN59T69"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div
          // whileHover={{ scale: 1.05 }}
          >
            <Card className="card">
              <Card.Img
                variant="top"
                src={myexperiments}
                className="article-image"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Story Of My Experiments With Truth By Mahatma Gandhi
                </Card.Title>
                <Card.Text className="card-text">
                  Every Indian kid is taught how great of a man this leader was.
                  But, Mahatma Gandhi was never perfect, which he truly accepts
                  in this book...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B01N23GR3M"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div
          // whileHover={{ scale: 1.05 }}
          >
            <Card className="card">
              <Card.Img variant="top" src={sapiens} className="article-image" />
              <Card.Body>
                <Card.Title className="card-title">
                  Sapiens By Yuval Noah Harari
                </Card.Title>
                <Card.Text className="card-text">
                  A brief history of humankind, Sapiens takes you on a journey
                  through the evolution of human beings...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B00ICN066A"
                  className="buy-button"
                >
                  Buy on Amazon
                </a>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col md={4} className="book-item">
          <div
          // whileHover={{ scale: 1.05 }}
          >
            <Card className="card">
              <Card.Img variant="top" src={history} className="article-image" />
              <Card.Body>
                <Card.Title className="card-title">
                  The History of Mankind By Friedrich Ratzel
                </Card.Title>
                <Card.Text className="card-text">
                  Friedrich Ratzel, a German geographer, wrote a groundbreaking
                  book on the subject of human history and geography. This book
                  takes you through the history of mankind right from its
                  beginning and the way it has evolved over time...
                </Card.Text>
                <a
                  href="https://www.amazon.com/dp/B08CD4H43P"
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

export default ArticleDetailDrVikas;
