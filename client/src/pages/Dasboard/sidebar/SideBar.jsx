import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUpload,
  FaUsers,
  FaProductHunt,
  FaSignInAlt,
  FaSignOutAlt,
  FaArrowUp,
  FaBookOpen,
  FaQuestionCircle,
  FaStore,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Use NavLink for active styling
import "./SideBar.css"; // Custom CSS file
import profile from "./profile.jpg";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { user } = useSelector((state) => state.user);
  // console.log("efwiw",user)
  return (
    <Navbar
      bg="dark"
      expand="lg"
      className="flex-column sidebar fixed px-3 py-3"
    >
      <Container fluid>
        <Nav className="flex-column">
          <Navbar.Brand href="#home" className="mb-2 flex h-full gap-3 w-6">
            <img
              src={profile}
              width={"40px"}
              height={"40px"}
              alt="Logo"
              className="rounded"
            />

            <h4 className="text-white mt-1" style={{ fontSize: "18px" }}>
              {user?.firstName?.charAt(0).toUpperCase() +
                user?.firstName?.slice(1).toLowerCase()}{" "}
              {user?.lastName?.charAt(0).toUpperCase() +
                user?.lastName?.slice(1).toLowerCase()}
            </h4>
          </Navbar.Brand>
          <NavLink
            to="/admin"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaTachometerAlt className="me-2" /> <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/upload"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaUpload className="me-2" /> <span>Upload Book</span>
          </NavLink>
          <NavLink
            to="/admin/manage"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaBookOpen className="me-2" />
            <span>Manage Book</span>
          </NavLink>
         
          <NavLink
            to="/products"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaProductHunt className="me-2" /> <span>Products</span>
          </NavLink>
          <NavLink
            to="/sign-in"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaSignInAlt className="me-2" /> <span>Sign In</span>
          </NavLink>
          <NavLink
            to="admin/logout"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaSignOutAlt className="me-2" /> <span>Log Out</span>
          </NavLink>
          <hr className="my-3 text-white"></hr>
          <NavLink
            to="admin/upgrade"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaArrowUp className="me-2" /> <span>Upgrade to Pro</span>
          </NavLink>
          <NavLink
            to="admin/documentation"
            className="sidebar-link"
            activeclassname="active"
          >
            <FaBookOpen className="me-2" /> <span>Documentation</span>
          </NavLink>
          <NavLink to="/help" className="sidebar-link" activeclassname="active">
            <FaQuestionCircle className="me-2" /> <span>Help</span>
          </NavLink>
          <hr className="my-3 text-white"></hr>
          {/* Back to Store Option */}
          <NavLink to="/" className="sidebar-link" activeclassname="active">
            <FaStore className="me-2" style={{ color: "#6a11cb" }} />
            <span>Back to Store</span>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SideBar;
