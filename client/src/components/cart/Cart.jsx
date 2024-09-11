import React, { useEffect } from "react";
import { Card, Button, Container, Row, Col, Image } from "react-bootstrap";
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
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container fluid className="cart-container mt-5 p-5">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any items to your cart yet.</p>
          <Button variant="primary">
            <Link to="/" className="text-white text-decoration-none">
              Explore Products
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Your Shopping Cart</h1>
          {cartItems.map((item, index) => (
            <Card className="cart-item-card mb-4 shadow-sm" key={item.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2} className="text-center">
                    <Image
                      src={item.imageUrl}
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
                    <h6>${parseFloat(item.totalPrice).toFixed(2)}</h6>
                  </Col>
                  <Col md={1} className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
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
                variant="danger"
                className="m-2"
                onClick={() => dispatch(clearCart())}
              >
                Delete All
              </Button>
              <Button variant="primary" className="m-2">
                <Link
                  to="/checkout"
                  className="text-white text-decoration-none"
                >
                  Proceed to Checkout
                </Link>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Cart;
