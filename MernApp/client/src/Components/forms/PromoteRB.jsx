import React, { Component } from "react";
import axios from "axios";
import "../../css/branchhome.css";
class PromoteRB extends Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <br />
        <select class="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <br />
        <button className="btn btn-dark"> ADD</button>
      </div>
    );
  }
}

export default PromoteRB;
