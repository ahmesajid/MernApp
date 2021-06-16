import React from "react";
import x from "../../images/a.jpg";
import y from "../../images/Bilal (1).jpg";
import z from "../../images/a.jpg";
import ahmer from "../../images/ahmer.jpg";

function About() {
  return (
    <>
      <div className="container-fluid  mt-5 mb-2">
        <h3 style={{ fontSize: "30px" }}>About Us</h3>

        <hr />
        <div className="mt-5">
          <p className="lead text-justify mt-1" style={{ fontSize: "15px" }}>
            Book and Eat is an online restaurant table booking platform that
            brings together a community of restaurateurs and allows customers to
            easily make informed decisions on where, when and what to eat. Pick
            your favourite eateries, make reservations and select the perfect
            menu in a matter of minutes, from the comfort of your home, via
            laptop or smartphone. Get a chance to access special deals and
            discount offers through our website as well.Book and Eat elevate
            your dining experience and ensure that the food is served on time
            and meets all your required specifications.
            <br />
            <br />
            <p className="text-center mt-1" style={{ fontSize: "15px" }}>
              Our goal is simple to make our customers love every moment.We give
              you the power to make choices at your price.
            </p>
          </p>
        </div>
        <br />
        <h3 style={{ fontSize: "30px" }}>Our Team</h3>
        <hr />
        <div class="w3-container-fluid w3-padding-64 w3-center" id="team">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <img
                src={x}
                alt="Boss"
                class="w3-circle w3-hover-opacity"
                width="180px"
                height="170px"
              />
              <h3>Shuja Ur-Rehman</h3>
              <p>Assistant Professor, PUCIT</p>
            </div>

            <div class="col-lg-3 col-md-6">
              <img
                src={ahmer}
                alt="Boss"
                class="w3-circle w3-hover-opacity"
                width="180px"
                height="170px"
              />
              <h3>Ahmer Bin Sajid</h3>
              <p>Software Engineer, PUCIT</p>
            </div>

            <div class="col-lg-3 col-md-6">
              <img
                src={y}
                alt="Boss"
                class="w3-circle w3-hover-opacity"
                width="180px"
                height="170px"
              />
              <h3>Muhammad Bilal</h3>
              <p>Software Engineer, PUCIT</p>
            </div>

            <div class="col-lg-3 col-md-6">
              <img
                src={z}
                alt="Boss"
                class="w3-circle w3-hover-opacity"
                width="180px"
                height="170px"
              />
              <h3>Allah Wasaya</h3>
              <p>Software Engineer, PUCIT</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
