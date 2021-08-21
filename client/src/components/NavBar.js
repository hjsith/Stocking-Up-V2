import React from "react";
import "../assets/css/navbar.scss";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/images/stocking-up.png";

const NavBar = () => {
  return (
    <Navbar className="navbar">
      <Navbar.Brand className="" href="#home">
        <img
          src={logo}
          width="30"
          height="30"
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
        <p id="myProfile">My Profile</p>
        <img
          src=""
          width="30"
          height="30"
          className="align-top"
          alt="Profile"
        />
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
