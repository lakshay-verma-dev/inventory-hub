import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Button,
  Dropdown,
} from "react-bootstrap";
import { FaHome, FaInfoCircle, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdDashboard, MdRecommend } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../../store/cartSlice";
import { clearUser } from "../../store/userSlice"; // Ensure you have a clearUser action in your userSlice
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "./profile.jpg";
import "./Navbarstyle.css";

const NavbarComponents = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const { user } = useSelector((state) => state.user);

  const userdata = user?.email ? 1 : 0;

  const logOut = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // console.log("ldsfj");
    
  };

  const handleLogout = () => {
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    logOut();
  };

  return (
    <Navbar
      expand="lg"
      className="shadow-sm colorful-navbar fixed-top m-0 pt-3 px-4"
    >
      <Container fluid>
        <Navbar.Brand className="text-white ">
          <span className="text-white text-3xl pl-5">Book Inventory</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-xl text-white">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                as={NavLink}
                to="/"
                activeclassname="active"
                className="text-white nav-link"
              >
                <FaHome className="me-2 text-white" />
                Home
              </Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                as={NavLink}
                to="/about"
                activeclassname="active"
                className="text-white"
              >
                <FaInfoCircle className="me-2 text-white" />
                About
              </Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                as={NavLink}
                to="/shop"
                activeclassname="active"
                className="text-white"
              >
                <FaBagShopping className="me-2 text-white" />
                Shop
              </Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                as={NavLink}
                to="/recommedation"
                activeclassname="active"
                className="text-white"
              >
                <MdRecommend className="me-2 text-white" />
                Editor’s Choice
              </Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Nav.Link
                as={NavLink}
                to="/admin"
                activeclassname="active"
                className="text-white"
              >
                <MdDashboard className="me-2 text-white" />
                Dashboard
              </Nav.Link>
            </motion.div>
            <motion.div
              className="mt-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Nav.Link
                as={NavLink}
                to="/cart"
                activeclassname="active"
                className="cart-h"
              >
                <FaShoppingCart className="me-2 text-white mt-2 text-3xl" />
                <Badge pill bg="danger" className="cart-badge">
                  {cartCount}
                </Badge>
              </Nav.Link>
            </motion.div>
            <motion.div className="mt-2">
              <Nav.Link
                as={NavLink}
                to="/login"
                activeclassname="active"
                className="text-white"
              >
                <Button variant="outline-light" className="signup-btn">
                  <b>Login</b>
                </Button>
              </Nav.Link>
            </motion.div>

            <motion.div>
              <Dropdown className="mt-3">
                <Dropdown.Toggle className="d-flex align-items-center bg-transparent border-white text-white">
                  <FaUser className="me-2 text-white" />
                  {userdata === 1 ? (
                    <>
                      {user?.firstName?.charAt(0).toUpperCase() +
                        user?.firstName?.slice(1).toLowerCase()}{" "}
                      {user?.lastName?.charAt(0).toUpperCase() +
                        user?.lastName?.slice(1).toLowerCase()}
                    </>
                  ) : (
                    " "
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="dropdown-menu-end">
                  {userdata === 1 ? (
                    <>
                      <Dropdown.Item as="div" className=" align-items-center">
                        <div className="text-center">
                          <img
                            src={profile}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div>
                          <strong>
                            {user?.firstName?.charAt(0).toUpperCase() +
                              user?.firstName?.slice(1).toLowerCase()}{" "}
                            {user?.lastName?.charAt(0).toUpperCase() +
                              user?.lastName?.slice(1).toLowerCase()}
                          </strong>
                          <br />
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Manage Account</Dropdown.Item>
                      {/* <Dropdown.Item> */}
                      <button
                        className="logout-btn py-1 px-4"
                        type="button"
                        onClick={handleLogout}
                      >
                        <small>Logout</small>
                      </button>
                      {/* </Dropdown.Item> */}
                    </>
                  ) : (
                    <Dropdown.Item disabled>No account</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
