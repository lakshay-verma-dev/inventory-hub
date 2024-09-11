import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageBook.css";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { deleteBook, getBook } from "../../api";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      toast.error("There was an error deleting the book!");
      console.error("There was an error deleting the book!", error);
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
      style={{
        boxShadow: "2px 2px 5px grey",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          <div className="no-data-message">
            <h4>No books available</h4>
            <p>Please upload a book to manage your inventory.</p>
            <Button variant="primary">
              <Link to="/admin/upload" className="text-white">
                Upload a Book
              </Link>
            </Button>
          </div>
        ) : (
          <Table hover responsive className="book-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>BOOK NAME</th>
                <th>AUTHOR NAME</th>
                <th>PRICE</th>
                <th>EDIT OR MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{truncateText(book.title, 20)}</td>
                  <td>{truncateText(book.author, 20)}</td>
                  <td>${book.price}</td>
                  <td className="flex justify-center gap-2">
                    <Button
                      variant="primary"
                      className="edit-button hover:bg-blue-950"
                    >
                      <Link
                        to={`/admin/manage/edit-book/${book._id}`}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit />
                        <span>Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(book._id)}
                      className="delete-button hover:bg-red-950 flex items-center gap-2"
                    >
                      <AiFillDelete />
                      <span>Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </motion.div>

      <ToastContainer />
    </Container>
  );
};

export default ManageBook;
  