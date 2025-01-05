import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteBook, getBook } from "../../../Api/BookApi";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBooks = async () => {
      try {
        const response = await getBook();
        setBooks(response.data);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const confirmDelete = (id) => {
    setBookToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteBook(bookToDelete);
      toast.success(response.data.message);
      setBooks(books.filter((book) => book.id !== bookToDelete));
    } catch (error) {
      toast.error("There was an error deleting the book!");
      console.error("There was an error deleting the book!", error);
    } finally {
      setShowModal(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="m-2 p-3"
      style={{ boxShadow: "2px 2px 5px grey" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="mb-4">
          <Col>
            <h2 className="text-3xl font-bold">Manage Your Books</h2>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {books.length === 0 ? (
          <div className="no-data-message text-center">
            <h4>No books available</h4>
            <p>Please upload a book to manage your inventory.</p>
            <Button variant="primary">
              <Link to="/admin/upload" className="text-white">
                Upload a Book
              </Link>
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {books.map((book, index) => (
              <Col md={4} lg={3} key={index} className="mb-4">
                <Card className="h-100 shadow-sm border-zinc-900">
                  <Card.Img
                    variant="top"
                    src={book.imageURL || "https://via.placeholder.com/150"}
                    alt={book.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{truncateText(book.title, 25)}</Card.Title>
                    <Card.Text>
                      <strong>Author:</strong> {truncateText(book.author, 20)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${book.price}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      className="flex-grow-1 me-2 book-action-btn"
                    >
                      <Link
                        to={`/admin/manage/edit-book/${book.id}`}
                        className="text-decoration-none d-flex align-items-center gap-2"
                      >
                        <AiFillEdit />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => confirmDelete(book.id)}
                      className="flex-grow-1 book-action-btn d-flex align-items-center gap-2"
                    >
                      <AiFillDelete />
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </motion.div>

      <ToastContainer />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageBook;
