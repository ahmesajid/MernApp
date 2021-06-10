import React from "react";
import "../../css/sidenav.css";
import "../../css/clock.css";
import { NavLink } from "react-router-dom";

function Momentum() {
  return (
    <>
      <div id="bg">
        <div className="container-fluid">
          <div class="d-flex justify-content-center relative">
            <div class="row " id="verticalCenter">
              <NavLink
                to={{
                  pathname: "/developersignin"
                }}
              >
                <div id="devop">
                  <i class="fas fa-user-shield child">
                    <h6 style={{ paddingTop: "2vh" }}>Developer</h6>
                  </i>
                </div>
              </NavLink>
              <NavLink
                to={{
                  pathname: "/adminsignIn"
                }}
              >
                <div id="mang">
                  <i class="fas fa-utensils child">
                    <h6 style={{ paddingTop: "2vh" }}>Restaurent</h6>
                  </i>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Momentum;
