import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBook, FaUser, FaChartLine, FaCartPlus } from "react-icons/fa";
import "./Documentation.css"; // Custom CSS for styling

const Documentation = () => {
  return (
    <Container
      fluid
      className="documentation-container m-2 p-3"
      style={{ boxShadow: "2px 2px 5px grey" }}
    >
      <Row className="justify-content-center text-center mb-5">
        <Col md={10}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="fw-bold">Book Inventory Documentation</h1>
            <p className="text-muted">
              Learn how to manage and use the Book Inventory application to its
              full potential.
            </p>
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <motion.div transition={{ duration: 0.3 }}>
            <Card className="shadow-sm border-info mb-4">
              <Card.Body>
                <Card.Title className="text-info text-center mb-3">
                  <FaBook size={32} className="me-2" />
                  Managing Books
                </Card.Title>
                <Card.Text>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <FaCartPlus className="text-success me-2" /> Add new books
                      to the inventory.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> Edit details
                      of existing books.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> Remove books
                      from the inventory.
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div transition={{ duration: 0.3 }}>
            <Card className="shadow-sm border-warning mb-4">
              <Card.Body>
                <Card.Title className="text-warning text-center mb-3">
                  <FaUser size={32} className="me-2" />
                  User Management
                </Card.Title>
                <Card.Text>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <FaCartPlus className="text-success me-2" /> Manage user
                      accounts.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> View user
                      transaction history.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> Assign user
                      roles (Admin/User).
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <motion.div transition={{ duration: 0.3 }}>
            <Card className="shadow-sm border-success mb-4">
              <Card.Body>
                <Card.Title className="text-success text-center mb-3">
                  <FaChartLine size={32} className="me-2" />
                  Analytics & Reports
                </Card.Title>
                <Card.Text>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <FaCartPlus className="text-success me-2" /> View detailed
                      sales analytics.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> Monitor
                      monthly inventory reports.
                    </li>
                    <li>
                      <FaCartPlus className="text-success me-2" /> Track user
                      activity and purchases.
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <motion.div transition={{ duration: 0.3 }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>How do I add a new book?</Accordion.Header>
                <Accordion.Body>
                  To add a new book, navigate to the "Upload Book" section, 
                  and fill out the required details, and click "Upload Book"
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  How do I view the inventory?
                </Accordion.Header>
                <Accordion.Body>
                  The inventory can be viewed from the main dashboard where all
                  books are listed.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>How do I upgrade to Pro?</Accordion.Header>
                <Accordion.Body>
                  To upgrade to Pro, go to the "Upgrade to Pro" page, select
                  your plan, and proceed with payment.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Documentation;
