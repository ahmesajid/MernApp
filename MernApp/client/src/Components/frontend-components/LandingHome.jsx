import React from "react";
import x from "../../images/logo1.png";
import image1 from "../../images/1.jpg";
import eat from "../../images/Eat.jpg";
import image2 from "../../images/2.jpg";
import laugh from "../../images/Laugh.jpg";
import "../../css/landinghome.css";
function Home() {
  return (
    <>
      <div
        className="text-center mt-2"
        style={{
          backgroundColor: "#26272b",
          color: "white",
          paddingTop: "20vh",
          paddingBottom: "20vh",
          paddingLeft: "20vw",
          paddingRight: "20vw",
        }}
      >
        <h1>Most Recommended Restaurant Reservation System</h1>

        <p style={{ fontSize: "12px" }}>
          Stop wasting your time on daily tasks such as email replies, social
          media chats or phone calls. Allow guests to book a table online 24/7
          and we will take care of the rest!
        </p>
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-8">
            <i class="fas fa-memory fa-4x"></i>
            <h2>Manage all Restaurant Reservations with ease.</h2>
            <br />
            <p>
              Book and Eat reservation management tools allow you to quickly
              view, add or edit reservations, move them around the day, and
              control reservation times. You can even control multiple
              restaurants from one single account!
            </p>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <img
              src={x}
              className="mt-4"
              alt="Logo"
              width="200vw"
              height="200vh"
            />
          </div>
        </div>
      </div>

      {/*Feature Card*/}
      <div className="mt-5 mr-5 ml-5">
        <div className="d-flex justify-content-center">
          <p style={{ fontSize: "30px", letterSpacing: "0.35vw" }}>
            Card Feature
          </p>
        </div>
        <div className="row mt-2">
          <div className="col-lg-7">
            <div class="cont">
              <img src={image2} alt="img1" class="img1" />
              <div class="ovl">
                <div class="txt">
                  To live a full life, you have to fill your stomach first.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div class="cont">
              <img src={eat} alt="img1" class="img2" />
              <div class="ovl">
                <div class="txt">
                  Eat, I don’t want to deprive myself of good food.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div class="cont">
              <img src={image1} alt="img1" class="img2" />
              <div class="ovl">
                <div class="txt">
                  If I can, I love staying in pajamas all day and watching
                  movies and eating good food.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 ">
            <div class="cont">
              <img src={laugh} alt="img1" class="img1" />
              <div class="ovl">
                <div class="txt">
                  Good laugh is a mighty good thing, a rather too scarce a good
                  thing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Feature Card*/}
      <div className=" container-fluid mt-5 text-center">
        <h1 style={{ letterSpacing: "0.5vh" }}>Top Restaurant</h1>
        <h4 className="text-muted">
          We can assist you with your innovation or commercialisation journey.
        </h4>
      </div>

      <div className="container-fluid mt-5 mb-5 text-center">
        <h1 style={{ letterSpacing: "0.5vh" }}>Our Partner</h1>
        <h4 className="text-muted">
          Pakistan Leading Food Restaurants Will choesen to partner with us.
        </h4>
      </div>
{/*       
<div className="container-fluid mt-5">
        <div className="row text-justify">
          <h2>Why we Need Reservation?</h2>
          <br />
          <p className="text-center" style={{ fontSize: "15px" }}>
            For the customer to know in advance that he will not have to go
            through the trouble of waiting until a table is available, or being
            put on a waiting list, or in the worst case, needing to find another
            place to eat, because the one chosen won't be able to serve him.
          </p>
        </div>
      </div> */}
    </>
  );
}

export default Home;
