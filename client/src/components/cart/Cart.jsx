import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "../../store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer here
import { paymentSession } from "../../Api/PaymentApi"; // Assuming you've imported your payment service
import { saveCart, getCart } from "../../Api/CartApi"; // Importing the Cart API functions
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  // Fetch the user's cart data from the backend
  const fetchCart = async () => {
    if (!user || !user.email) {
      toast.error("You must be logged in to view your cart.");
      return;
    }

    try {
      const response = await getCart(user.email);
      const fetchedCart = response.data;
      console.log("Fetched Cart:", fetchedCart);

      if (fetchedCart && fetchedCart.items) {
        // Dispatch the action to update the Redux store with the fetched cart items
        fetchedCart.items.forEach((item) => {
          dispatch(
            updateQuantity({
              id: item.productName, // Ensure correct id is being passed
              quantity: item.quantity,
            })
          );
        });
      } else {
        // toast.error("No items found in your cart.");
      }
    } catch (error) {
      toast.error("Failed to fetch the cart.");
      console.error(error);
    }
  };

  // Save cart to the backend
  const saveCartToBackend = async (text) => {
    if (!user || !user.email) {
      toast.error("You must be logged in to save the cart.");
      return;
    }

    const cartData = {
      email: user.email, // Send email directly
      items: cartItems.map((item) => ({
        productName: item.title,
        productPrice: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        imageUrl: item.imageURL,
      })),
    };

    try {
      const response = await saveCart(cartData); // Directly send cartData
      toast.success(text);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to save the cart.");
      console.error(error);
    }
  };

  // Handle the payment logic
  const makePayment = async () => {
    if (!user || !user.email) {
      toast.error("You are not logged in. Please log in to buy a product.");
      return;
    }

    setPaymentLoading(true);

    const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
    try {
      const response = await paymentSession({
        products: cartItems.map((item) => ({
          title: item.title,
          price: item.price,
          imageUrl: item.imageURL,
          quantity: item.quantity,
        })),
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

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch cart on load if the user is logged in
    if (user && user.email) {
      fetchCart();
    }
  }, [user]);

  return (
    <Container fluid className="cart-container mt-5 p-5">
      {paymentLoading && (
        <div className="payment-overlay">
          <Spinner animation="border" variant="light" className="text-black" />
          <h4 className="text-black mt-3">
            Processing payment, please wait...
          </h4>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any items to your cart yet.</p>
          <Button variant="primary">
            <Link to="/shop" className="text-white text-decoration-none">
              Explore Products
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Your Shopping Cart</h1>
          {cartItems.map((item) => (
            <Card className="cart-item-card mb-4 shadow-sm" key={item.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2} className="text-center">
                    <Image
                      src={item.imageURL}
                      alt={item.title}
                      className="cart-item-image"
                      fluid
                    />
                  </Col>
                  <Col md={3}>
                    <h5>{item.title}</h5>
                  </Col>
                  <Col md={2} className="text-center">
                    <h6>${parseFloat(item.price).toFixed(2)}</h6>
                  </Col>
                  <Col md={2} className="text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                      className="quantity-input"
                    />
                  </Col>
                  <Col md={2} className="text-center">
                    <h6>${(item.price * item.quantity).toFixed(2)}</h6>
                  </Col>
                  <Col md={1} className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        dispatch(removeFromCart(item.id)); // Remove item from Redux store
                        saveCartToBackend(
                          `${item.title} has been removed from your cart.`
                        ); // Save updated cart to backend
                        // toast.success(
                        //   `${item.title} has been removed from your cart.`
                        // ); // Show success toast
                      }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Row className="justify-content-center mt-4">
            <Col md={8} className="text-center">
              <h4>Grand Total: ${parseFloat(totalPrice).toFixed(2)}</h4>
              <Button variant="success" className="m-2">
                <Link to={"/shop"} className="text-white text-decoration-none">
                  Explore More Products
                </Link>
              </Button>

              <Button
                variant="primary"
                className="m-2"
                onClick={() => saveCartToBackend("Cart saved successfully!")}
              >
                Save Cart
              </Button>
              <Button
                variant="danger"
                className="m-2"
                onClick={makePayment}
                disabled={paymentLoading}
              >
                {paymentLoading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Add the ToastContainer here */}
      <ToastContainer />
    </Container>
  );
}

export default Cart;
