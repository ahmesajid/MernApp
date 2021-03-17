import React, { Component} from "react";
import AddRestaurant from "../forms/AddRestaurant";
import DeleteRestaurant from "../delete/DeleteRestaurant";
import AddBranch from "../forms/AddBranch";
import DeleteBranch from "../delete/DeleteBranch";
import HigherAuthorities from '../backend-components/HigherAuthorities';
import '../../css/developerdashboard.css';
class Developer extends Component {
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
      <>
        <div className="container-fluid-fluid">
          <div class="sidenav dev-left">
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(1)}>
              <i class="fas fa-plus-circle"></i> Restaurant
            </button>
            <button className="btn btn-link" onClick={()=>this.setCount(2)}>
              <i class="fas fa-trash-alt"></i> Restaurant
            </button>
            <button className="btn btn-link" onClick={()=>this.setCount(3)}>
              <i class="fas fa-plus-circle"></i> Branch
            </button>
            <button className="btn btn-link" onClick={()=>this.setCount(4)}>
              <i class="fas fa-trash-alt"></i> Branch
            </button>
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(5)}>
              Higher Authorities
            </button>
            <br/>
            <button className="btn btn-link">
              Manager Report
            </button>
            <button className="btn btn-link">
              User Report
            </button>
            <button className="btn btn-link" onClick={this.props.logout}>
              Logout
            </button>
            <br/>

          </div>
          <div className="dev-right">
            <div>{this.state.counter == 1 ? <AddRestaurant /> : 
            <div>{this.state.counter == 2 ? < DeleteRestaurant/> : 
            <div>{this.state.counter == 3 ? < AddBranch/> : 
            <div>{this.state.counter == 4 ? < DeleteBranch/> : 
            <div>{this.state.counter == 5 ? < HigherAuthorities/> : 
            <h1 className="center text-muted">See left pannel for navigation</h1>}</div>
            }</div>
            }</div>
            }</div>
            }</div>
          </div>
        </div>
      </>
    );
  }
}
export default Developer;
