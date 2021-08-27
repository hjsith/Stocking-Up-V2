import React from "react";
import "../assets/css/navbar.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/images/stocking-up.png";
import profileIcon from "../assets/images/ProfileIcon.png";

const NavBar = () => {
  return (
    <Navbar className="navbar">
      <Navbar.Brand className="Logo" href="/temp">
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
        <NavDropdown title="Markets" id="basic-nav-dropdown">
          <NavDropdown.Item href="#Markets Overview">
            Markets Overview
          </NavDropdown.Item>
          <NavDropdown.Item href="#Newsfeed">News Feed</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Social" id="basic-nav-dropdown">
          <NavDropdown.Item href="#Friends">Friends</NavDropdown.Item>
          <NavDropdown.Item href="#Leaderboard">Leaderboard</NavDropdown.Item>
          <NavDropdown.Item href="#DiscussionBoard">
            Discussion Board Search
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Companies" id="basic-nav-dropdown">
          <NavDropdown.Item href="/CompanySearch">Search</NavDropdown.Item>
          <NavDropdown.Item href="/quotemgmt">Order</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <NavDropdown
          title={
            <div className="temp">
              <p id="myProfile">Profile</p>
              <img src={profileIcon} className="ProfileIcon" alt="Profile" />
            </div>
          }
          id="basic-nav-dropdown-noCaret"
          align="end"
        >
          <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#Logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
