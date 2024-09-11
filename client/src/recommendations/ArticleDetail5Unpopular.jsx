import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import woman from "./images/woman.jpeg";
import nonfictionbookscopy from "./images/nonfictionbookscopy.jpeg";
import rape from "./images/rape.jpeg";
import granddaughter from "./images/granddaughter.jpeg";
import detectives from "./images/detectives.jpeg";
import road from "./images/rape.jpeg";
import "./css.css";

import React, { useEffect } from "react";

const ArticleDetail5Unpopular = () => {
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
      <h1>5 Unpopular Fiction Books That Deserve Your Attention</h1>
      <div className="author-section">
        <img
          src={nonfictionbookscopy}
          alt="Unpopular Fiction Books Cover"
          className="author-image"
        />
        <p>
          Finding some new fiction novels? We've got you covered! Here are 5
          lesser-known fiction books that are worth your time.
        </p>
      </div>
      <Row className="book-list">
        {/* Book 1 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={rape}
                className="article-image"
                alt="Rape Trial by Bidisha Ghosal"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Rape Trial by Bidisha Ghosal
                </Card.Title>
                <Card.Text className="card-text">
                  The author <strong>Bidisha Ghosal</strong> has done an
                  exemplary task of knitting such a sensitive topic and doing
                  justice to the title of the novel. While reading "Rape Trial,"
                  one will feel a blend of emotions gushing in...
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
                src={granddaughter}
                className="article-image"
                alt="The Granddaughter Project by Shaheen Chishti"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Granddaughter Project by Shaheen Chishti
                </Card.Title>
                <Card.Text className="card-text">
                  <strong>The Granddaughter Project</strong> is a novel about
                  three females who have had their share of trauma in one way or
                  the other. When they meet each other and share their stories,
                  they decide to write letters to their future granddaughters...
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
                src={detectives}
                className="article-image"
                alt="The Amateur Detectives by Sayan Sahoo"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Amateur Detectives by Sayan Sahoo
                </Card.Title>
                <Card.Text className="card-text">
                  What do we think of? Neal and Diggi, two became partners while
                  solving a case and go further on to solve many more such cases
                  together. Not to forget Neal’s lazy but loyal dog, Jimmy...
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
                src={road}
                className="article-image"
                alt="Road to Abana by Lata Gwalani"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Road to Abana by Lata Gwalani
                </Card.Title>
                <Card.Text className="card-text">
                  <strong>Road to Abana</strong> is the story of Raaf and her
                  steady determination to return to her home in Sudak, Karachi,
                  after the trauma of abuse and identity crisis after the
                  Partition of 1947...
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
                src={woman}
                className="article-image"
                alt="The Woman Within by Nitya Ravi"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  The Woman Within by Nitya Ravi
                </Card.Title>
                <Card.Text className="card-text">
                  The book revolves around Zia, her very teen years in a school
                  when she had suddenly kissed him. Suddenly, he was killed, not
                  long thereafter. Many years later, Zia becomes one of the
                  known forensic investigators...
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

export default ArticleDetail5Unpopular;
