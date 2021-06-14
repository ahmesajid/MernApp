import React, { Component } from "react";

class ManagerReport extends Component {
  render() {
    return (
      <div>
        {/*Map function start */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "5%",
          }}
        >
          <div
            style={{ border: "1px solid black", width: "80%" }}
            className="rounded p-4"
          >
            <h4>Restaurant Name</h4>
            <p style={{ fontSize: "12px" }} className="text-info">
              Branch Location
            </p>
            <h6 className="text-muted">Subject</h6>
            <div style={{ wordWrap: "break-word" }}>
              Messagsadjagdkgkghskajfhsgdjkfahsgjdfhgsjdgfjsgdfjsgdfkjsagdfjkshgdfjshgjhdgjsgjdgfjsgdfjshgfjshgdfjgsdjfhgsajgfjsdgfjsghdfjsgdjfgsjdgfjsgdfjshgdjfshgdfjhsgdjfhgsjhgfjshgdjshgfjsgdjkfhgsdjgfsjdhgfjshgdfjsdghfjsgdfjshgdjfshgdfjshgdfjsghdjfgsdjgsajdghfjsdgfjsgdjsgdjgshgdjfhgssajgdhskdgksgaksdhgfsdhgsjgfjsge
            </div>
            <span style={{ float: "right" }}>
              <p style={{ fontSize: "12px" }} className="text-info">
                Date & Time
              </p>
            </span>
          </div>
        </div>
        {/*Map function end */}
      </div>
    );
  }
}

export default ManagerReport;
