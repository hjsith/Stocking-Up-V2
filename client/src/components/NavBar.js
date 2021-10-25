import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";
import "../assets/css/navbar.scss";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/images/LogowithoutB.png";
import profileIcon from "../assets/images/ProfileIcon.png";
import UserProfileIcon from "./UserProfileIcon";

const NavBar = () => {
  const cont = useContext(UserContext);
  const Logout = () => {
    //Logout
    fetch("/api/logout", {
      //connects to frotnend to backend
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    cont.updateUser({ name: "", id: "" });
  };
  return (
    <Navbar className="navbar">
      <Navbar.Brand className="Logo" href="/temp">
        <img
          src={logo}
          width="45"
          height="45"
          className="align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link className="navitem" href="/Portfolio">
          Portfolio
        </Nav.Link>
        <NavDropdown title="Markets" id="basic-nav-dropdown">
          <NavDropdown.Item href="/MarketsOverview">
            Markets Overview
          </NavDropdown.Item>
          <NavDropdown.Item href="/Newsfeed">News Feed</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Social" id="basic-nav-dropdown">
          <NavDropdown.Item href="/Friends">Friends</NavDropdown.Item>
          <NavDropdown.Item href="/Leaderboard">Leaderboard</NavDropdown.Item>
          <NavDropdown.Item href="/DiscussionBoardSearch">
            Discussion Board Search
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Companies" id="basic-nav-dropdown">
          <NavDropdown.Item href="/CompanySearch">Search</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <NavDropdown
          title={
            <div className="navbarProfile">
              <p id="myProfile">Profile</p>
              <div className="navbarProfileIcon">
                <div className="navbarIcon">
                  <UserProfileIcon
                    name={cont.user.name}
                    company={false}
                    size={35}
                  />
                </div>
              </div>
            </div>
          }
          id="basic-nav-dropdown-noCaret"
          align="end"
        >
          <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={Logout} href="/SignIn">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
