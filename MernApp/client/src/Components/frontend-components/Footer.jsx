import React from "react";

function Footer() {
  return (
    <>
      <div
        class="text-center pt-3 pl-2 pr-2"
        style={{
          left: "0",
          right: "0",
          backgroundColor: "#26272b",
          color: "white",
          position:"relative",
          marginBottom:"0"
        }}
      >
        <div className="row">
          <div className="col-sm-4 m-auto">
            <p>Location</p>
            <p className="text-muted">
              PUCIT, Katchery Road, Near Anarkali, Lahore, 54000
            </p>
          </div>

          <div className="col-sm-4 m-auto">
            <p>FOLLOW US</p>
            <i
              class="fab fa-facebook ml-2 fa-2x"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              class="fab fa-twitter ml-2 fa-2x"
              style={{ cursor: "pointer" }}
            ></i>
            <i
              class="fab fa-instagram ml-2 fa-2x"
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div className="col-sm-4 mt-3">
            <p>Contact US</p>
            <p className="text-muted">
              <i class="fas fa-envelope fa-xs"></i> example@gmail.com
            </p>
            <p className="text-muted">
              <i class="fas fa-phone-alt"></i> 03xx-xxxxxxx
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
