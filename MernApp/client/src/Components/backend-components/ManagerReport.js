import React, { Component } from "react";
import axios from "axios";
import '../global'

class ManagerReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminIssues: [{}],
      issueCount: 0,
    };
  }
  componentDidMount() {
    try {
      //FETCHING RESTAURANTS
      axios
        .get(`${global.backend}/issue/get/admin`)
        .then((data) => {
          if (data.data.status == "error") {
            // alert(data.data.message);
            console.log(data.data.message);
          } else if (data.data.status === 1) {
            this.setState(
              {
                adminIssues: data.data.issues,
                issueCount: data.data.issues.length,
              },
              () => console.log(this.state.issueCount)
            );
          }
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center m-4  p-4 flex-column bg-light">
          <div className="d-flex p-2 m-2">
            <h1>
              Manager Open Issues{" "}
              {this.state.issueCount ? (
                <>
                  <span style={{ color: "green" }}>
                    ({this.state.issueCount})
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: "red" }}>
                    ({this.state.issueCount})
                  </span>
                </>
              )}
            </h1>
          </div>
          <div>
            {this.state.issueCount ? (
              this.state.adminIssues.map((issue, index) => (
                <div className="d-flex flex-column bg-dark text-white p-1 m-3 rounded">
                  <div className="d-flex flex-row justify-content-between p-1 m-1">
                    <div className="d-flex flex-row">
                      <div className="bg-success rounded p-2">
                        <h3>
                          <p style={{ letterSpacing: 2 }}>
                            Issue # {index + 1}
                          </p>
                        </h3>
                      </div>
                      <div
                        className="m-1 p-1 text-muted"
                        style={{ alignItems: "flex-end" }}
                      >
                        <p>
                          created by{" "}
                          <span className="text-info">{issue.email}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <button type="button" className="btn btn-md btn-danger">
                        Close Issue
                      </button>
                    </div>
                  </div>
                  <div className="mx-auto p-2">
                    {" "}
                    <p style={{ letterSpacing: 1.5, wordWrap: "break-word" }}>
                      {issue.description}
                    </p>
                  </div>
                  <div className="ml-auto p-2 text-muted">
                    {" "}
                    <p>{issue.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerReport;
