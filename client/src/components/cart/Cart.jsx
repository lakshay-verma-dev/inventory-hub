import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
} from "../../store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { paymentSession } from "../../Api/PaymentApi";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const deleteItem = (itemId, title) => {
    dispatch(removeFromCart(itemId));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
    toast.success("All items have been removed from the cart.");
  };

  const purchaseAllItems = async () => {
    if (!user || !user.email) {
      toast.error("You are not logged in. Please log in to buy products.");
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
        toast.error("Error in payment process.");
        console.error(result.error.message);
      }
    } catch (error) {
      toast.error("Error in payment process.");
      console.error(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

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
        <Row>
          <Col md={8}>
            <h1 className="text-center mb-4">Your Shopping Cart</h1>
            <Table bordered hover responsive className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <Image
                        src={item.imageURL}
                        alt={item.title}
                        className="cart-item-image rounded me-3"
                        fluid
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
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
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteItem(item.id, item.title)}
                        className="btn-sm me-2"
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={4} className="order-summary">
            <div className="p-4 shadow rounded">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="float-end">${totalPrice.toFixed(2)}</span>
              </p>
              <p>
                Shipping: <span className="float-end">Free</span>
              </p>
              <hr />
              <h5>
                Total:{" "}
                <span className="float-end">${totalPrice.toFixed(2)}</span>
              </h5>
              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={purchaseAllItems}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="warning"
                className="w-100 mt-2"
                onClick={clearAllItems}
              >
                Clear Cart
              </Button>
            </div>
          </Col>
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
}

export default Cart;
