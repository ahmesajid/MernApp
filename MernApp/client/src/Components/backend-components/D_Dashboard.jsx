import React from "react";
import ReactDOM from "react-dom";
import "../../css/D_Dashboard.css";
import i from "../../images/Bezier.svg";
import Chart from "react-apexcharts";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

export default class D_Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        series: [70],
        options: {
          chart: {
            height: 280,
            type: "radialBar",
          },

          series: [67],

          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "70%",
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#888",
                  fontSize: "13px",
                },
                value: {
                  color: "#111",
                  fontSize: "30px",
                  show: true,
                },
              },
            },
          },

          stroke: {
            lineCap: "round",
          },
          labels: ["Open Issues"],
        },
      },
      {
        series: [70],
        options: {
          chart: {
            height: 280,
            type: "radialBar",
          },

          series: [67],

          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "70%",
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#888",
                  fontSize: "13px",
                },
                value: {
                  color: "#111",
                  fontSize: "30px",
                  show: true,
                },
              },
            },
          },

          stroke: {
            lineCap: "round",
          },
          labels: ["close Issues"],
        },
      },
      {
        options: {
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
          },
        },
        series: [
          {
            name: "series-2",
            data: [30, 20, 30, 50, 75, 28, 79],
          },
        ],
      },
    ];
  }
  render() {
    return (
      <>
        <main>
          <div class="main__container">
            <div class="main__title">
              <img src={i} alt="" />
              <div class="main__greeting">
                <h1>Hello Developers</h1>
              </div>
            </div>

            <div class="main__cards">
              <div class="card">
                <i
                  class="fas fa-cookie fa-2x text-lightblue"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p">Total Restaurant</p>
                  <span class="font-bold text-title">888</span>
                </div>
              </div>

              <div class="card">
                <i
                  class="fas fa-project-diagram fa-2x text-lightblue"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p">Restaurant Branches</p>
                  <span class="font-bold text-title">467</span>
                </div>
              </div>

              <div class="card">
                <i class="fas fa-bug fa-2x text-green" aria-hidden="true"></i>
                <div class="card_inner">
                  <p class="text-primary-p">Manager's Report Issue</p>
                  <span class="font-bold text-title">340</span>
                </div>
              </div>

              <div class="card">
                <i
                  class="fas fa-exclamation-triangle fa-2x text-green"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p">User's Report Issue</p>
                  <span class="font-bold text-title">645</span>
                </div>
              </div>

              <div class="card">
                <i class="fas fa-box-tissue fa-2x " aria-hidden="true"></i>
                <div class="card_inner">
                  <p class="text-primary-p">Total Reservations</p>
                  <span class="font-bold text-title">645</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div class="charts__left weeklyChart">
                  <div class="charts__left__title">
                    <div>
                      <h1>Reservation Weekly Report</h1>
                    </div>
                  </div>
                  <Chart
                    options={this.state[2].options}
                    series={this.state[2].series}
                    type="bar"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div class="charts__right issueChart">
                  <div class="charts__right__title">
                    <div>
                      <h1>Issues Report</h1>
                    </div>
                  </div>
                  <div>
                    <Chart
                      options={this.state[0].options}
                      series={this.state[0].series}
                      type="radialBar"
                      height={165}
                    />
                    <Chart
                      options={this.state[1].options}
                      series={this.state[1].series}
                      type="radialBar"
                      height={165}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row calender">
              <div className="col-md-8">
                <div class="charts__left weeklyChart">
                  <div class="charts__left__title">
                    <div>
                      <h1>Todo Activities</h1>
                    </div>
                    <span>
                      <i
                        class="fas fa-plus-circle pr-2"
                        style={{ cursor: "pointer" }}
                        data-toggle="modal"
                        data-target="#addTODO"
                      ></i>

                      <i
                        class="fas fa-trash-alt"
                        style={{ cursor: "pointer" }}
                        data-toggle="modal"
                        data-target="#deleteTODO"
                      ></i>
                    </span>
                  </div>
                  <div
                    style={{
                      height: "35vh",
                      overflowY: "scroll",
                    }}
                  >
                    <p>Helloooooooo</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <CalendarComponent
                  className="rounded"
                  value={new Date()}
                  start="Decade"
                ></CalendarComponent>
              </div>
            </div>
          </div>
        </main>
        {/* Modal for ADD TODO */}
        <div
          class="modal fade"
          id="addTODO"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  ADD Todo.
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      placeholder="Enter..."
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark">
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for delete TODO */}
        <div
          class="modal fade"
          id="deleteTODO"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Delete Todo.
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <select class="form-control form-control-sm">
                  <option selected>Select to delete</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
