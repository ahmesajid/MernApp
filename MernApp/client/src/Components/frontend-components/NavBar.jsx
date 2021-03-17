import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "../../css/navbar.css";
import logo from "../../images/logo.png";
import Home from './LandingHome'
import Restaurants from './RestaurantListShow'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import PrivacyPolicy from './PrivacyPolicy'
function NavBar() {
  return (
    <>
      
      <nav
        class="navbar navbar-expand-md "
        style={{ backgroundColor: "#efefef", boxShadow: "0px 5px 5px #ccc" }}
      >
        <Link to="/" class="navbar-brand pl-1 nav-logo" >
          <img src={logo} alt="Logo" width="50px" />
        </Link>
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars" ></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto w-100 justify-content-end">
              <li class="nav-item">
                <Link class="nav-link" to="/Home">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Restaurant">
                  Restaurant
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" to="/Privacy-Policy">
                  Privacy Policy
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/About-Us">
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Contact-Us">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
    </>
  );
}
export default NavBar;
