import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import {
  FaBook,
  FaUser,
  FaTag,
  FaInfoCircle,
  FaDollarSign,
  FaArrowLeft,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { getsingleBook, updatedBook } from "../../../Api/BookApi";

const EditBook = () => {
  const { id } = useParams();

  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookCategory: "",
    bookDescription: "",
    bookPrice: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Fiction",
    "Non-fiction",
    "Science",
    "Biography",
    "Horror",
    "Fantasy",
    "Romance",
    "History",
    "Mystery",
    "Thriller",
    "Children's Books",
    "Self-help",
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getsingleBook(id);
        setBookData({
          bookTitle: response.data.title,
          bookAuthor: response.data.author,
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", bookData.bookTitle);
      formData.append("author", bookData.bookAuthor);
      formData.append("category", bookData.bookCategory);
      formData.append("description", bookData.bookDescription);
      formData.append("price", bookData.bookPrice);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      try {
        await updatedBook(id, formData); // Ensure this API call accepts `FormData` and sends a `multipart/form-data` request
        toast.success("Book updated successfully!");

        // Reset fields after successful update
        setBookData({
          bookTitle: "",
          bookAuthor: "",
          bookCategory: "",
          bookDescription: "",
          bookPrice: "",
        });
        setImageFile(null);
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
        <Form onSubmit={handleUpdate} encType="multipart/form-data">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookTitle">
                <Form.Label className="font-semibold">Book Title</Form.Label>
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
                <Form.Label className="font-semibold">Author Name</Form.Label>
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
              <Form.Group controlId="formBookImage">
                <Form.Label className="font-semibold">Book Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBookCategory">
                <Form.Label className="font-semibold">Category</Form.Label>
                <Form.Control
                  as="select"
                  name="bookCategory"
                  value={bookData.bookCategory}
                  onChange={handleChange}
                  isInvalid={!!errors.bookCategory}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
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
                <Form.Label className="font-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bookDescription"
                  value={bookData.bookDescription}
                  onChange={handleChange}
                  isInvalid={!!errors.bookDescription}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bookDescription}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookPrice">
                <Form.Label className="font-semibold">Price</Form.Label>
                <Form.Control
                  type="text"
                  name="bookPrice"
                  value={bookData.bookPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.bookPrice}
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
            {submitting ? "Updating..." : "Update Book"}
          </Button>
        </Form>
        <ToastContainer />
      </motion.div>
    </Container>
  );
};

export default EditBook;
