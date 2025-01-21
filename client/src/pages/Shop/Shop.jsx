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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { getBook } from "../../Api/BookApi";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShopCard.css";
import { paymentSession } from "../../Api/PaymentApi";

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

// Utility function to truncate text
const truncateText = (text, limit) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

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
    if (!user || !user.email) {
      toast.error("You are not logged in. Please log in to buy a product.");
      return;
    }

    setPaymentLoading(true);

    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    try {
      const response = await paymentSession({
        products: [
          {
            title: item.title,
            price: item.price,
            imageUrl: item.imageURL,
            quantity: 1,
          },
        ],
      });

      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Payment error:", result.error.message);
        toast.error("Error in payment process");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Error in payment process");
    } finally {
      setPaymentLoading(false);
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
    <>
      {paymentLoading && (
        <div className="payment-overlay">
          <Spinner animation="border" variant="light" className="text-black" />
          <h4 className="text-black mt-3">
            Processing payment, please wait...
          </h4>
        </div>
      )}
      <Container
        fluid
        className={`px-10 mt-28 ${paymentLoading ? "blurred" : ""}`}
      >
        <ToastContainer />
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
        <Row className="flex justify-around shop-card-container">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => (
              <Col
                key={item.id}
                md={4}
                sm={6}
                xs={12}
                className="mb-4"
                style={{ width: "22.4rem" }}
              >
                <motion.div className="position-relative cart-shop-card">
                  <Card className="h-100">
                    <div className="shopping-icon">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        variant="light"
                      >
                        <FaShoppingCart />
                      </Button>
                    </div>
                    <Link to={`/book/${item.id}`}>
                      <Card.Img
                        variant="top"
                        className="h-96"
                        src={item.imageURL}
                      />
                    </Link>
                    <Card.Body className="text-black">
                      <Card.Title className="text-black mb-1">
                        {truncateText(item.title, 20)}
                      </Card.Title>
                      <Card.Text className="text-muted mb-2">
                        By <b>{truncateText(item.author, 15)}</b>
                      </Card.Text>
                      <Card.Text className="mb-1">
                        {truncateText(item.description, 60)}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mb-0">
                        <span className="text-primary">${item.price}</span>
                        <Button
                          className="explore-more-button px-3"
                          variant="primary"
                          onClick={() => makePayment(item)}
                        >
                          Buy Now
                        </Button>
                      </div>
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
    </>
  );
};

export default Shop;
