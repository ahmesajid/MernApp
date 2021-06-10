import React, { Component } from "react";
import AddRecipe from "../forms/AddRecipe";
import DeleteRecipe from "../delete/DeleteRecipe";
import BranchProfile from "../backend-components/BranchProfile"
import ChangePassword from '../backend-components/ChangePassword'
import '../../css/sidenav.css';
import '../../css/admindashboard.css';
class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter:0
    }
  }
  setCount(count){
    this.setState({
      counter:count
    })
  }
  render() {
    return (
        <div className="container-fluid">
          <div class="sidenav">
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(1)}>
              <i class="fas fa-users"></i> Profile
            </button>
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(2)}>
              Add Recipe
            </button>
            <button className="btn btn-link" onClick={() => this.setCount(3)}>
              Delete Recipe
            </button>
            <br />
            <button className="btn btn-link" onClick={() => this.setCount(4)}>
              Change Password
            </button>
            <button className="btn btn-link" onClick={this.props.logout}>Logout</button>
          </div>

          <div className="dev-right">
            <div>{this.state.counter == 1 ? <BranchProfile /> : 
            <div>{this.state.counter == 2 ? <AddRecipe bData={this.props.bData}/> : 
            <div>{this.state.counter == 3 ? <DeleteRecipe bData={this.props.bData}/> : 
            <div>{this.state.counter == 4 ? <ChangePassword /> :<h1 className="center text-muted">See left pannel for navigation</h1>}
            </div>}
            </div>}
            </div>}</div>
            
          </div>
        </div>
    );
  }
}

export default Manager;