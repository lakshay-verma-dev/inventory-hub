import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import {
  FaBook,
  FaUser,
  FaImage,
  FaTag,
  FaInfoCircle,
  FaDollarSign,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { uploadBook } from "../../../Api/BookApi"; // Assuming this is the correct import for the upload function
import { useSelector } from "react-redux";

const UploadBook = () => {
  const { user } = useSelector((state) => state.user);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    image: null,
    category: [],
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validate = () => {
    const newErrors = {};
    if (!bookData.title) newErrors.title = "Book title is required";
    if (!bookData.author) newErrors.author = "Author name is required";
    if (!bookData.image) newErrors.image = "Book image file is required";
    if (bookData.category.length === 0)
      newErrors.category = "At least one category is required";
    if (!bookData.description)
      newErrors.description = "Book description is required";
    if (!bookData.price) newErrors.price = "Book price is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategories = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setBookData({ ...bookData, category: selectedCategories });
    } else if (name === "image") {
      setBookData({ ...bookData, image: e.target.files[0] });

      const newErrors = { ...errors };
      if (!e.target.files[0]) {
        newErrors.image = "Image file is required";
      } else {
        delete newErrors.image;
      }
      setErrors(newErrors);
    } else {
      setBookData({ ...bookData, [name]: value });

      const newErrors = { ...errors };
      if (!value) {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required`;
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("author", bookData.author);
        formData.append("image", bookData.image);
        formData.append("category", bookData.category);
        formData.append("description", bookData.description);
        formData.append("price", bookData.price);
        formData.append("user", user.email)

        const response = await uploadBook(formData); 
        toast.success(response.data.message);

        setBookData({
          title: "",
          author: "",
          image: null,
          category: [],
          description: "",
          price: "",
        });
        setErrors({});
        const fileInput = document.querySelector('input[name="image"]');
        if (fileInput) {
          fileInput.value = ""; 
        }
      } catch (error) {
        if (error.response) {
          const errorMessage =
            error.response.data.error || "An error occurred!";
          toast.error(errorMessage);
        } else {
          toast.error("Failed to upload the book. Please try again later.");
        }
      }
    } else {
      setErrors(formErrors);
      toast.error("Please fill out all required fields.");
    }
    setIsSubmitting(false);
  };
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
            <h2 className="text-3xl font-bold">Upload the book</h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookTitle">
                <Form.Label className="flex items-center font-semibold">
                  <FaBook className="mr-2" /> <span>Book Title</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter Book Title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
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
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  isInvalid={!!errors.author}
                  placeholder="Enter Author's Name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookimage">
                <Form.Label className="flex items-center font-semibold">
                  <FaImage className="mr-2" /> <span>Book Image File</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  isInvalid={!!errors.image}
                  style={{
                    padding: "5px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
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
                  name="category"
                  value={bookData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formBookDescription">
                <Form.Label className="flex items-center font-semibold">
                  <FaInfoCircle className="mr-2" />{" "}
                  <span>Book Description</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  placeholder="Enter Book Description"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formBookPrice">
                <Form.Label className="flex items-center font-semibold">
                  <FaDollarSign className="mr-2" /> <span>Book Price</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  placeholder="Enter Book Price"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <motion.div>
                <Button
                  className="w-full p-2"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload Book"}
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </motion.div>
      <ToastContainer />
    </Container>
  );
};

export default UploadBook;
