import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  FaBook,
  FaUser,
  FaImage,
  FaTag,
  FaInfoCircle,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { getsingleBook, UpdateBook } from "../../api";

const EditBook = () => {
  const { id } = useParams();

  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookImageUrl: "",
    bookCategory: "",
    bookDescription: "",
    bookPrice: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: 1, name: "Fiction" },
    { id: 2, name: "Non-fiction" },
    { id: 3, name: "Science" },
    { id: 4, name: "Biography" },
    { id: 5, name: "Horror" },
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getsingleBook(id);
        setBookData({
          bookTitle: response.data.title,
          bookAuthor: response.data.author,
          bookImageUrl: response.data.imageUrl,
          bookCategory: response.data.category,
          bookDescription: response.data.description,
          bookPrice: response.data.price,
        });
      } catch (error) {
        console.error("There was an error fetching the book!", error);
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!bookData.bookTitle) newErrors.bookTitle = "Book title is required";
    if (!bookData.bookAuthor) newErrors.bookAuthor = "Author name is required";
    if (!bookData.bookImageUrl)
      newErrors.bookImageUrl = "Book image URL is required";
    if (!bookData.bookCategory)
      newErrors.bookCategory = "Book category is required";
    if (!bookData.bookDescription)
      newErrors.bookDescription = "Book description is required";
    if (!bookData.bookPrice) newErrors.bookPrice = "Book price is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });

    const newErrors = { ...errors };
    if (!value) {
      newErrors[name] = `${name.replace(/([A-Z])/g, " $1")} is required`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitting(true);
      setBookData({
        bookTitle: "",
        bookAuthor: "",
        bookImageUrl: "",
        bookCategory: "",
        bookDescription: "",
        bookPrice: "",
      });
      const updateBook = {
        title: bookData.bookTitle,
        author: bookData.bookAuthor,
        imageUrl: bookData.bookImageUrl,
        category: bookData.bookCategory,
        description: bookData.bookDescription,
        price: bookData.bookPrice,
      };
      try {
        await UpdateBook(id, updateBook);
        toast.success("Book updated successfully!");
        
      } catch (error) {
        console.error("There was an error updating the book!", error);
        toast.error("Failed to update the book.");
      } finally {
        setSubmitting(false);
      }
    } else {
      setErrors(formErrors);
      toast.error("Please fill out all required fields.");
    }
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={"/admin/manage"}>
          <FaArrowLeft size={24} className="m-2" />
        </Link>
        <Row className="mb-4">
          <Col>
            <h2 className="text-3xl font-bold">Update the book details</h2>
          </Col>
        </Row>
        <Form onSubmit={handleUpdate}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookTitle">
                <Form.Label className="flex items-center font-semibold">
                  <FaBook className="mr-2" /> <span>Book Title</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bookTitle"
                  value={bookData.bookTitle}
                  onChange={handleChange}
                  isInvalid={!!errors.bookTitle}
                  placeholder="Enter Book Title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookTitle}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAuthorName">
                <Form.Label className="flex items-center font-semibold">
                  <FaUser className="mr-2" /> <span>Author Name</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bookAuthor"
                  value={bookData.bookAuthor}
                  onChange={handleChange}
                  isInvalid={!!errors.bookAuthor}
                  placeholder="Enter Author's Name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookAuthor}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookImageUrl">
                <Form.Label className="flex items-center font-semibold">
                  <FaImage className="mr-2" /> <span>Book Image URL</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bookImageUrl"
                  value={bookData.bookImageUrl}
                  onChange={handleChange}
                  isInvalid={!!errors.bookImageUrl}
                  placeholder="Enter Image URL"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookImageUrl}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBookCategory">
                <Form.Label className="flex items-center font-semibold">
                  <FaTag className="mr-2" /> <span>Book Category</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="bookCategory"
                  value={bookData.bookCategory}
                  onChange={handleChange}
                  isInvalid={!!errors.bookCategory}
                  placeholder="Select a category"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.bookCategory}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="formBookDescription">
                <Form.Label className="flex items-center font-semibold">
                  <FaInfoCircle className="mr-2" /> <span>Description</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="bookDescription"
                  value={bookData.bookDescription}
                  onChange={handleChange}
                  isInvalid={!!errors.bookDescription}
                  placeholder="Enter Book Description"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookDescription}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBookPrice">
                <Form.Label className="flex items-center font-semibold">
                  <FaDollarSign className="mr-2" /> <span>Price</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bookPrice"
                  value={bookData.bookPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.bookPrice}
                  placeholder="Enter Book Price"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookPrice}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full mt-4"
          >
            {submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Updating...
              </>
            ) : (
              "Update Book"
            )}
          </Button>
        </Form>
        <ToastContainer />
      </motion.div>
    </Container>
  );
};

export default EditBook;
