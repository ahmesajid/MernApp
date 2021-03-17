import React from "react";
function ContactUs() {
  return (
    <>
      <div className="container-fluid mt-5 mb-5">
        <h3 style={{ fontSize: "30px" }}>Contact Us</h3>
        <hr />
        <div className="row mt-5">
          <div className="col-md-4 pl-4">
            <h4
              className="mb-4"
              style={{ letterSpacing: ".2vw", paddingRight: "2vw" }}
            >
              Our Office
            </h4>
            <div className="row">
              <p
                className="text-muted"
                style={{ fontSize: "15px", paddingRight: "2vw" }}
              >
                18_R, New Building, PUCIT, Katchery Road, Near Anarkali, Lahore,
                54000
              </p>
            </div>
            <div className="row mt-3">
              <i
                class="fas fa-phone-alt"
                style={{ fontSize: "30px", paddingRight: "3vh" }}
              ></i>
              <p>0300-12345678</p>
            </div>
            <div className="row mt-3">
              <i
                class="fas fa-envelope"
                style={{ fontSize: "30px", paddingRight: "3vh" }}
              ></i>

              <p>techno@gmail.com</p>
            </div>
            <hr className="mb-5" />
          </div>

          <div className="col-md-8">
            <h4 className="mb-4" style={{ letterSpacing: ".2vw" }}>
              Contact Form
            </h4>
            <form>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First name"
                    style={{ height: "8vh" }}
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last name"
                    style={{ height: "8vh" }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="E-mail Address"
                    style={{ height: "8vh" }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="Subject"
                    style={{ height: "8vh" }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <textarea
                    class="form-control"
                    id="textmessage"
                    rows="5"
                    placeholder="Description"
                    required
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-dark btn-lg mt-4">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
