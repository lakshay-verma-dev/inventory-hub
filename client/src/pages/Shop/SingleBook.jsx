import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getsingleBook } from "../../Api/BookApi";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./singleBook.css"; // Custom CSS
import { paymentSession } from "../../Api/PaymentApi";
import { addToCart } from "../../store/cartSlice";

const SingleBook = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user); // Get user from Redux store
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const response = await getsingleBook(id);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching the book!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const makePayment = async (item) => {
    if (!user || !user.email) {
      toast.error(
        "You are not logged in. Please log in to buy the product.",
        {}
      );
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
        toast.error("Error in payment process.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Error in payment process.");
    } finally {
      setPaymentLoading(false);
    }
  };
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
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
        className={`single-book-container mt-5 ${
          paymentLoading ? "blurred" : ""
        }`}
      >
        <ToastContainer />
        <Row className="px-5 py-5">
          <button className="button-back text-black" onClick={handleBackClick}>
            <FaArrowLeft size={24} /> Back
          </button>
          <Col md={4} sm={12} xs={12} className="image-col m-0 p-0">
            <Card className="book-image-card">
              <Card.Img
                variant="top"
                className="rounded h-96"
                src={book.imageURL}
                alt={book.title}
                style={{ boxShadow: "2px 2px 5px grey" }}
              />
            </Card>
          </Col>
          <Col md={8} sm={12} xs={12} className="content-col m-0 p-0">
            <h1 className="book-title text-left mb-2 p-0">{book.title}</h1>
            <p className="author-name text-muted font-semibold">
              by <b>{book.author}</b>
            </p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="star-icon" />
              ))}
              <span className="rating-text">4.5/5</span>
            </div>
            <h2 className="text-left mb-1">Description:</h2>
            <pre className="description">{book.description}</pre>

            <h3 className="mb-2">
              Genre{" "}
              <b className="border-b-2 border-cyan-500">{book.category}</b>
            </h3>
            <h2 className="price text-primary">${book.price}</h2>
            <Button
              variant="primary"
              className="cart-button me-2"
              onClick={() => handleAddToCart(book)}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
            <Button
              onClick={() => makePayment(book)}
              variant="success"
              className="buy-now-button"
            >
              Buy Now
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleBook;
