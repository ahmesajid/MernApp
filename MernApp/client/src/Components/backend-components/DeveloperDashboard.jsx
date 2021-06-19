import React, { Component } from "react";
import AddRestaurant from "../forms/AddRestaurant";
import DeleteRestaurant from "../delete/DeleteRestaurant";
import AddBranch from "../forms/AddBranch";
import DeleteBranch from "../delete/DeleteBranch";

import D_Dashboard from "../backend-components/D_Dashboard";
import HigherAuthorities from '../backend-components/HigherAuthorities';
import ManagerReport from '../backend-components/ManagerReport';
import UserReport from '../backend-components/UserReport';
import '../../css/sidenav.css';
import axios from 'axios';
class Developer extends Component {
  constructor(props) {
    super(props);
    this.state = {

      counter:0,
      isAuthenticated:false,
      display:0, //DISPLAY 0 (SHOWS NOTHING) 1 SHOWS TO AUTHENTICATE FIRST 3 SHOWS DEV PANNEL
      
    }
    this.removeCookie = this.removeCookie.bind(this);
  }
  setCount(count) {
    this.setState({
      counter: count,
    });
  }
  getData= async()=>{
    // YOU CAN RUN 1 OR 2 BOTH ARE CORRECT
    //1
    axios.defaults.withCredentials = true;
    axios.post("/developer/validate")
    .then((data)=>{
      if(data.data.isAuthenticated){this.setState({isAuthenticated:data.data.isAuthenticated,display:2});}
      else{this.setState({isAuthenticated:data.data.isAuthenticated,display:1});}
      
    })
    .catch(err=>console.log(err));    

    //2 
    // const res = await fetch("/developer/validate", {method:"POST",headers:{
    //   Accept:"application/json","Content-Type":"application/json"},
    //   credentials:"include"
    // });
    // let isAuthUser = await res.json();
    // console.log(isAuthUser);
  }
  componentDidMount(){
  
   this.getData();
  }
  removeCookie(){
    axios.defaults.withCredentials = true;
    try {
      axios.post("/developer/remove/cookie")
      .then((data)=>{
        if(data.data.isRemoved){
          alert("removed");
          this.props.logout()
      }}).catch(err=>console.log(err))
    } catch (error) {
      console.log(error);
    }
    
  }
  render() {
    const {display} = this.state ;
    if(display === 2){
      return (
        <>
          <div className="d-flex flex-row">
            <div className="sidenav w-25">
              <br />
              <button className="btn btn-link" onClick={() => this.setCount(8)}>
                Dashboard
              </button>
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
              <button className="btn btn-link" onClick={()=>this.setCount(6)}>
                Manager Report
              </button>
              <button className="btn btn-link" onClick={()=>this.setCount(7)}>
                User Report
              </button>
              <button className="btn btn-link" onClick={this.removeCookie}>
                Logout
              </button>
              <br/>
  
            </div>
            <div className="w-75 right">
              <div>{this.state.counter == 1 ? <AddRestaurant /> : 
                    
              <div>{this.state.counter == 2 ? < DeleteRestaurant/> : 
              <div>{this.state.counter == 3 ? < AddBranch/> : 
              <div>{this.state.counter == 4 ? < DeleteBranch/> : 
              <div>{this.state.counter == 5 ? < HigherAuthorities/> : 
              <div>{this.state.counter == 6 ? < ManagerReport/> : 
              <div>{this.state.counter == 7 ? < UserReport/> :
               <div>{this.state.counter == 8 ? <D_Dashboard /> :
              <h1 className="center text-muted">See left pannel for navigation</h1>}</div>
              }</div>
              }</div>
              }</div>
              }</div>
              }</div>
              }</div>
              }</div>
            </div>
          </div>
        </>
      );
    }
    else if(display===1){
      return(<div  style={{textAlign:"center",color:'red',fontWeight:"bold",fontSize:'25',letterSpacing:1.3,marginTop:'50vh'}}>You are not authenticated. Sign in first.</div>)}
    else if(display===0){return(<div  style={{textAlign:"center",color:'green',fontWeight:"bold",fontSize:'25',letterSpacing:1.3,marginTop:'50vh'}}>LOADING <span></span></div>)}  
    }
  
}
export default Developer;
