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
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cartSlice";
import "./Navbarstyle.css";
import { useFirebase } from "../../provider/AuthProvider";
import { doc, getDoc } from "firebase/firestore";

const NavbarComponents = () => {
  const cartCount = useSelector(selectCartCount);
  // const { user, logout, db, firebaseAuth } = useFirebase();
  const { logOut, user } = useFirebase();
  // console.log(user);
  

  // const [userDetails, setUserDetails] = useState(null);

  // const fetchUsers = async () => {
  //   firebaseAuth.onAuthStateChanged(async (user) => {
  //     console.log(user);
  //     const docRef = doc(db, "users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setUserDetails(docSnap.data());
  //       console.log(docSnap.data());
  //     } else {
  //       console.log("not login");
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // fetchUsers();
  // });
  const handleLogout = () => {
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    logOut()
  }

  return (
    <Navbar
      expand="lg"
      className="shadow-sm colorful-navbar fixed-top px-8 m-0 pt-3"
    >
      <Container fluid>
        <Navbar.Brand className="text-3xl text-white ">
          Book Inventory
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
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
            <Nav.Link
              as={NavLink}
              to="/login"
              activeclassname="active"
              className="text-white"
            >
              <Button variant="outline-light" className="signup-btn">
                Login
              </Button>
              <span className="ms-2"></span>
            </Nav.Link>

            <motion.div>
              <Dropdown className="mt-3">
                <Dropdown.Toggle
                  variant="outline-light"
                  // id="dropdown-basic"
                  className="d-flex align-items-center hover:bg-transparent text-white"
                >
                  <FaUser className="me-2 text-white" />
                  {/* {user?.displayName} */}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="dropdown-menu-end">
                  {user ? (
                    <>
                      <Dropdown.Item as="div" className=" align-items-center">
                        <div className="text-center">
                          {" "}
                          <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div>
                          <strong>{user?.displayName}</strong>
                          <br />
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={NavLink} to="/manage-account">
                        Manage Account
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <p>
                          {" "}
                          <Button onClick={handleLogout}>Logout</Button>
                        </p>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item disabled>No account</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponents;
