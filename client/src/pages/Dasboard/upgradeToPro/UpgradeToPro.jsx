import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown, FaRocket } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import "./UpgradeToPro.css"; // Custom styles
import { paymentSession } from "../../../Api/PaymentApi";

const UpgradeToPro = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleUpgrade = async (plan) => {
    setPaymentLoading(true);

    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

    const productData = {
      title: `${plan} Plan`,
      price: plan === "Pro" ? 25 : 10, // Pro plan: $25, Standard plan: $10
      quantity: 1,
    };

    try {
      const response = await paymentSession({
        products: [productData],
      });

      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Payment error:", result.error.message);
        toast.error("Error in payment process.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Error in payment process.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <Container
      className="upgrade-container m-2 p-3"
      fluid
      style={{ boxShadow: "2px 2px 5px grey" }}
    >
      {paymentLoading && (
        <div className="payment-overlay">
          <Spinner animation="border" variant="light" className="text-black" />
          <h4 className="text-black mt-3">
            Processing payment, please wait...
          </h4>
        </div>
      )}

      <Row className="justify-content-center text-center mb-4">
        <Col md={10}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="fw-bold">Upgrade to Pro</h1>
            <p className="text-muted">
              Unlock premium features to take your book inventory experience to
              the next level.
            </p>
          </motion.div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <motion.div
            // whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-sm border-primary">
              <Card.Body>
                <Card.Title className="text-primary text-center mb-3">
                  <FaRocket size={32} className="me-2" />
                  Standard Plan
                </Card.Title>
                <Card.Text>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Access to
                      basic inventory management
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> View and
                      purchase books
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Basic
                      analytics
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Monthly
                      summary reports
                    </li>
                  </ul>
                </Card.Text>
                <div className="text-center mb-3">
                  <h2 className="text-primary fw-bold">$10/month</h2>
                </div>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => handleUpgrade("Standard")}
                >
                  Upgrade to Standard
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={5} className="mb-4">
          <motion.div
            // whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg border-success">
              <Card.Body>
                <Card.Title className="text-success text-center mb-3">
                  <FaCrown size={32} className="me-2" />
                  Pro Plan{" "}
                  <span className="badge bg-warning text-dark">
                    Most Popular
                  </span>
                </Card.Title>
                <Card.Text>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Advanced
                      analytics and insights
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Priority
                      customer support
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Ad-free
                      experience
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Special
                      discounts on bulk purchases
                    </li>
                    <li>
                      <FaCheckCircle className="text-success me-2" /> Access to
                      exclusive content
                    </li>
                  </ul>
                </Card.Text>
                <div className="text-center mb-3">
                  <h2 className="text-success fw-bold">$25/month</h2>
                </div>
                <Button
                  variant="success"
                  className="w-100"
                  onClick={() => handleUpgrade("Pro")}
                >
                  Upgrade to Pro
                </Button>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
      <Row className="justify-content-center text-center mt-4">
        <Col md={8}>
          <Card className="shadow-sm border-light">
            <Card.Body>
              <h3 className="fw-bold text-primary mb-4">Plan Comparison</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Feature</th>
                    <th className="text-center">Standard Plan</th>
                    <th className="text-center">Pro Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Advanced Analytics</td>
                    <td>
                      <FaCheckCircle className="text-danger" />
                    </td>
                    <td>
                      <FaCheckCircle className="text-success" />
                    </td>
                  </tr>
                  <tr>
                    <td>Priority Support</td>
                    <td>
                      <FaCheckCircle className="text-danger" />
                    </td>
                    <td>
                      <FaCheckCircle className="text-success" />
                    </td>
                  </tr>
                  <tr>
                    <td>Ad-Free Experience</td>
                    <td>
                      <FaCheckCircle className="text-danger" />
                    </td>
                    <td>
                      <FaCheckCircle className="text-success" />
                    </td>
                  </tr>
                  <tr>
                    <td>Discounts on Bulk Purchases</td>
                    <td>
                      <FaCheckCircle className="text-danger" />
                    </td>
                    <td>
                      <FaCheckCircle className="text-success" />
                    </td>
                  </tr>
                  <tr>
                    <td>Exclusive Content</td>
                    <td>
                      <FaCheckCircle className="text-danger" />
                    </td>
                    <td>
                      <FaCheckCircle className="text-success" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mt-5">
        <Col md={10}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="fw-bold">Why Go Pro?</h2>
            <p className="text-muted">
              Pro members get access to premium tools and features designed to
              simplify inventory management, boost productivity, and enhance
              their experience.
            </p>
          </motion.div>
        </Col>
      </Row>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default UpgradeToPro;
