import React, { Component } from "react";
import "../../css/restaurantlistshow.css";
import axios from "axios";
import SelectBranch from "../frontend-components/FilterBranch";
import WaiterImage from "../../images/waiter.png";

class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isParent: false,
      isChild: false,
      branchesdetails: [],
      restaurantData: [],
      restaurantId: null,
      isLoaded: false,
      button: '<button type="btn" class="btn btn-info">Click</button>',
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.setState({
      isParent: true,
      isChild: false,
    });
  }
  showHome(id) {
    this.setState({
      isParent: false,
      isChild: true,
      restaurantId: id,
    });
  }
  componentDidMount = () => {
    this.goBack();
    this.setState({
      resData: [],
    });
    try {
      //FETCHING RESTAURANTS
      axios
        .get("/restaurant/get")
        .then((data) => {
          if (data.data.status == "error") {
            // alert(data.data.message);
            console.log(data.data.message);
          } else if (data.data.status == "ok" && data.data.resData.length) {
            this.setState({
              restaurantData: data.data.resData,
              isLoaded: true,
              isParent: true,
            });
            console.log(this.state.restaurantData);
            // alert("Restaurant fetched successfully!");
          }
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { isChild, isParent, isLoaded } = this.state;
    if (isParent && isLoaded) {
      return (
        <div className="container">
          <div class="wrapper">
            <div class="searchBar">
              <input
                id="searchQueryInput"
                type="text"
                name="searchQueryInput"
                placeholder="Search"
                value=""
              />
              <button
                id="searchQuerySubmit"
                type="submit"
                name="searchQuerySubmit"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="row justify-content-around mb-5">
            {this.state.restaurantData.map((rs) => (
              <div
                className="single-restaurant-list mt-1 mb-1"
                id={rs._id}
                onClick={this.showHome.bind(this, rs._id)}
              >
                <div className="d-flex restaurant-flex flex-row">
                  <div className="restaurant-list-photo p-3">
                    <div className="restaurant-image-box">
                      <img
                        class="restaurant-list-img"
                        src={`/Images/Restaurants/${rs.fName}`}
                      />
                    </div>
                  </div>
                  <div className="restaurant-list-details p-3">
                    <div className="d-flex flex-column ">
                      <div className="d-flex flex-row align-items-center">
                        <div className="name p2">
                          <h2>{rs.name}</h2>
                          <hr />
                        </div>
                      </div>
                      <div className="mt-0">
                        <p className="text-muted pt-2">{rs.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (isChild && isLoaded) {
      return (
        <div>
          <SelectBranch resId={this.state.restaurantId} />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className=" mx-auto d-flex flex-row justify-content-center mt-4 mb-4 pt-4 pb-4">
          <div className="d-flex align-items-center">
            <h2
              className="p-2 m-2"
              style={{
                fontFamily: "sans-serif",
                letterSpacing: 2,
                fontWeight: "bold",
              }}
            >
              Your restaurant data will load here.
            </h2>
          </div>
          <div className="p-2 m-2">
            <img src={WaiterImage} style={{ width: "22vw", height: "48vh" }} />
          </div>
        </div>
      );
    }
  }
}
export default Rest;
