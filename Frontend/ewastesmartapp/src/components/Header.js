import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg bg-primary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <LinkContainer to="/">
            <Nav.Link className="navbar-brand">Waste Mgnt Smart App</Nav.Link>
          </LinkContainer>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  Home <i className="fa-solid fa-house"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/todo" className="nav-link">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="/points"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Points Awarded
                </NavLink>
                <div className="dropdown-menu">
                  <NavLink to="/pointbal" className="dropdown-item">
                    Points Balance
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink to="/redeempoints" className="dropdown-item">
                    Redeem Points
                  </NavLink>
                </div>
              </li>
              {userInfo ? (
                <li className="nav-item dropdown">
                  <NavLink
                    to="/"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Welcome {userInfo.name}
                  </NavLink>
                  <div className="dropdown-menu">
                    <NavLink to="/logout">
                      <a className="dropdown-item" onClick={logoutHandler}>
                        Logout
                      </a>
                    </NavLink>
                  </div>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    to="/signup"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    New User?
                  </NavLink>
                  <div className="dropdown-menu">
                    <NavLink to="/login" className="dropdown-item">
                      Login
                    </NavLink>
                    <NavLink to="/signup" className="dropdown-item">
                      Signup
                    </NavLink>
                  </div>
                </li>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
