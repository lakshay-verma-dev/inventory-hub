import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getBook, paymentSession } from "../api";
import "./BookCard.css"; // Assume this file has necessary custom styles
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer here
import "react-toastify/dist/ReactToastify.css";
import { useFirebase } from "../provider/AuthProvider";

const categories = [
  "All Books",
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

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const dispatch = useDispatch();
  const { user } = useFirebase(); // Firebase user

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBooks = async () => {
      try {
        const response = await getBook(); // Replace with your API endpoint
        setBooks(response.data);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks =
    selectedCategory === "All Books"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const makePayment = async (item) => {
    if (!user) {
      toast.error("No user logged in. Please log in to purchase the product.", {
        // position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const stripe = await loadStripe(
      "pk_test_51PuzQeAeVmKMN0IrakS9fpOweJcytIb4dteFs0k4xZOMUyh9QDt3J4pJCAx4I6DxN9UdipdYITwNhzFSN73Xi59F009YKq5khJ"
    );

    try {
      const response = await paymentSession({
        products: [
          {
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: 1,
          },
        ],
      });

      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error in payment process:", error);
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
    <Container fluid className="px-10 mt-28">
      <ToastContainer /> {/* Add ToastContainer here */}
      <Row className="category-dropdown-container">
        <Col className="d-flex justify-content-center">
          <Form.Select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Select Category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="banner-heading"
        >
          <h2 className="text-5xl text-left font-bold text-black pt-8 ">
            {selectedCategory === "All Books"
              ? "All Books"
              : `${selectedCategory} Books`}
          </h2>
        </motion.div>
      </Row>
      <Row className="flex justify-around">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <Col
              key={item._id}
              md={4}
              sm={6}
              xs={12}
              className="mb-4"
              style={{ width: "25rem" }}
            >
              <motion.div
                className="position-relative cart-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-100">
                  <div className="shopping-icon">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="light"
                    >
                      <FaShoppingCart />
                    </Button>
                  </div>
                  <Link to={`/book/${item._id}`}>
                    <Card.Img
                      variant="top"
                      className="h-96"
                      src={item.imageUrl}
                    />
                  </Link>
                  <Card.Body className="text-black">
                    <Card.Title className="text-black mb-1">
                      {item.title}
                    </Card.Title>
                    <Card.Text className="m-0 p-0">
                      <small className="text-muted">
                        by <b>{item.author}</b>
                      </small>
                    </Card.Text>
                    <Card.Text className="text-primary">
                      ${item.price}
                    </Card.Text>
                    <Button
                      className="explore-more-button w-full"
                      variant="primary"
                      onClick={() => makePayment(item)}
                    >
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))
        ) : (
          <Col className="text-center my-4">
            <h4>No books available for the selected category.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Shop;
