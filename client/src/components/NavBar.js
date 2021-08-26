import React from "react";
import "../assets/css/navbar.scss";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/images/Lightlogo.png";
import profileIcon from "../assets/images/ProfileIcon.png";

const NavBar = () => {
  return (
    <Navbar className="navbar">
      <Navbar.Brand className="Logo" href="#home">
        <img
          src={logo}
          width="45"
          height="45"
          className="align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className="navitem" href="#portfolio">
          Portfolio
        </Nav.Link>
        <Nav.Link className="navitem" href="#markets">
          Markets Overview
        </Nav.Link>
        <Nav.Link className="navitem" href="#social">
          Social
        </Nav.Link>
      </Nav>
      <Navbar.Brand className="navitem justify-content-end" href="#profile">
        <p id="myProfile">My Profile </p>
        <img
          src={profileIcon}
          width="35"
          height="35"
          className="align-top"
          alt="Profile"
        />
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
