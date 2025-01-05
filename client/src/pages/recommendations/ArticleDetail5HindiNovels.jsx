import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import hindicopy from "./images/hindicopy.jpg";
import musafir from "./images/musafir.jpeg";
import banaras from "./images/banaras.jpeg";
import dopehri from "./images/dopehri.jpeg";
import dark from "./images/dark.jpeg";
import ibnebatuti from "./images/ibnebatuti.jpeg";
import "./css.css";
import React, { useEffect } from "react";

const ArticleDetail5HindiNovels = () => {
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
      <h1>5 Best Hindi Novels for Beginners</h1>
      <div className="author-section">
        <img
          src={hindicopy}
          alt="5 Best Hindi Novels for Beginners"
          className="author-image"
        />
        <p>
          Thinking of starting to read Hindi novels? Here’s a list of the 5 best
          fiction novels that are easy, enjoyable, sometimes sad, but
          informative.
        </p>
      </div>
      <Row className="book-list">
        {/* Book 1 */}
        <Col md={4} className="book-item">
          <div whileHover={{ scale: 1.05 }}>
            <Card className="card">
              <Card.Img
                variant="top"
                src={musafir}
                className="article-image"
                alt="Musafir Cafe by Divya Prakash Dubey"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Musafir Cafe by Divya Prakash Dubey
                </Card.Title>
                <Card.Text className="card-text">
                  कहानी है उन लोगों की जिन्हें न प्यार की भाषा आती है, और-जो लोग
                  प्यार की भाषा भी नहीं समझते। यह पुस्तक प्रेमियों की है जो किसी
                  को प्यार करने के लिए तैयार नहीं हैं, या जो उनके प्यार में असफल
                  रहे हैं।
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
                src={banaras}
                className="article-image"
                alt="Banaras Talkies by Satya Vyas"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Banaras Talkies by Satya Vyas
                </Card.Title>
                <Card.Text className="card-text">
                  बनारस टॉकीज़ का पुस्तकालय देश के विशिष्ट रूप से लक्षण है। एक
                  प्रफुल्लित करने वाली और आह्लादित किताब है, जो आपको बनारस हिंदू
                  विश्वविद्यालय (BHU) के छात्रों के जीवन की झलक देती है।
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
                src={dopehri}
                className="article-image"
                alt="Dopehri by Pankaj Kapur"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Dopehri by Pankaj Kapur
                </Card.Title>
                <Card.Text className="card-text">
                  अम्मा बी एक अकेली विधवा हैं जो अपने सुनसान लखनऊ हवेली में रहती
                  हैं। हर दोपहर को वह धीरे-धीरे तीसरी मंजिल पर जाती हैं और सड़क
                  पर अज्ञात चेहरे को देखती हैं। यह किताब आपको जीवन में हंसी,
                  खुशी और प्यार की खूबसूरती से अवगत कराती है।
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
                src={dark}
                className="article-image"
                alt="Dark Horse by Nilotpal Mrinal"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Dark Horse by Nilotpal Mrinal
                </Card.Title>
                <Card.Text className="card-text">
                  दिल्ली के मुखर्जी नगर में IAS की तैयारी कर रहे छात्रों के जीवन
                  पर आधारित है। यह पुस्तक आपको बताती है कि कैसे एक साधारण
                  व्यक्ति असाधारण बन जाता है।
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
                src={ibnebatuti}
                className="article-image"
                alt="Ibnebatuti by Divya Prakash Dubey"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  Ibnebatuti by Divya Prakash Dubey
                </Card.Title>
                <Card.Text className="card-text">
                  इब्नेबतूती एक अनूठी कहानी है जो आपको एक अद्भुत यात्रा पर ले
                  जाएगी। यह पुस्तक आपको हमारे समाज के विभिन्न पहलुओं से अवगत
                  कराएगी।
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

export default ArticleDetail5HindiNovels;
