import React, { Component } from "react";
import AddRecipe from "../forms/AddRecipe";
import DeleteRecipe from "../delete/DeleteRecipe";
import BranchProfile from "../backend-components/BranchProfile"
import ChangePassword from '../backend-components/ChangePassword'
import CreateIssue from '../forms/CreateIssue';
import '../../css/sidenav.css';
import '../../css/admindashboard.css';
import AuthenticatedImage from '../../images/authenticated.png'
import axios from 'axios';
import {Redirect} from "react-router-dom";
import '../global'

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter:0,
      aData:[{}],
      bData:[{}],
      isAuthenticated:false,
      adminId:null,
      message:null,
      key:null,
      display:3, //DISPLAY 0 (SHOWS NOTHING) 1 SHOWS TO AUTHENTICATE FIRST 3 SHOWS DEV PANNEL
      isLoggedIn:null
      }
      this.removeCookie = this.removeCookie.bind(this);

  }
  componentDidMount(){
    this.getData();
}
removeCookie(){
  axios.defaults.withCredentials = true;
  try {
    axios.post(`${global.backend}/admin/remove/cookie`)
    .then((data)=>{
      if(data.data.isRemoved){
        this.setState({isLoggedIn:false,display:4,isAuthenticated:false})
    }}).catch(err=>console.log(err))
  } catch (error) {
    console.log(error);
  }
  
}
getData= async()=>{
  // YOU CAN RUN 1 OR 2 BOTH ARE CORRECT
  //1
  axios.defaults.withCredentials = true;
  axios.post(`${global.backend}/admin/validate`)
  .then((data)=>{
    if(data.data.key === 1){
      this.setState({
        isAuthenticated:data.data.isAuthenticated,
        display:2,
        aData:data.data.aData,
        bData:data.data.bData,
        adminId:data.data.bData[0]._id,
        message:data.data.message});
      }
    else if(data.data.key === -1){
      this.setState({
        isAuthenticated:data.data.isAuthenticated,
        display:0,
        message:data.data.message});

    }  
    else{
      this.setState({
        isAuthenticated:data.data.isAuthenticated,
        display:0,
        message:data.data.message
      });

    }
    
  })
  .catch(err=>console.log(err));    

  //2 
  // const res = await fetch("/admin/validate", {method:"POST",headers:{
  //   Accept:"application/json","Content-Type":"application/json"},
  //   credentials:"include"
  // });
  // let isAuthUser = await res.json();
  // console.log(isAuthUser);
}
setCount(count){
  this.setState({
    counter:count
  })
}
  render() {
    const {display , adminId , message} = this.state ;
    if(display===2){
    return (
      <div className="d-flex flex-row">
          <div class="sidenav w-25">
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(1)} >
              <i class="fas fa-users"></i> Profile
            </button>
            <br />
            <button className="btn btn-link" onClick={()=>this.setCount(2)} >
              Add Recipe
            </button>
            <button className="btn btn-link" onClick={() => this.setCount(3)}>
              Delete Recipe
            </button>
            <button className="btn btn-link" onClick={() => this.setCount(4)} >
              Create An Issue
            </button>
            <br />
            <button className="btn btn-link" onClick={() => this.setCount(5)}>
              Change Password
            </button>
            <button className="btn btn-link" onClick={this.removeCookie}>Logout</button>
          </div>

          <div className="w-75 right">
            <div>{this.state.counter == 1 ? <BranchProfile adminId={adminId}/> : 
            <div>{this.state.counter == 2 ? <AddRecipe bData={this.state.bData}/> : 
            <div>{this.state.counter == 3 ? <DeleteRecipe bData={this.state.bData}/> : 
            <div>{this.state.counter == 4 && this.state.aData? <CreateIssue aData={this.state.aData}/> :
            <div>{this.state.counter == 5 ? <ChangePassword /> :
            <h1 className="center text-muted">See left pannel for navigation</h1>
            }</div>
            }</div>
            }</div>
            }</div>
            }</div>
            
          </div>
        </div>
    )}
     else if(display===0){
      return(
        <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop:"20vh"}}>
          <div><img src={AuthenticatedImage} style={{width:'22vw',height:'45vh'}}/></div>
          <div><p className="" style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold',fontSize:'30px'}}>You are not an authenticated admin.</p></div>
          <div><p style={{fontFamily:'sans-serif',letterSpacing:1,fontWeight:'bold' , color:"green"}}> Sign in first to authenticate</p></div>
      </div>
      )}
    else if(display===3){return(<div  style={{textAlign:"center",color:'green',fontWeight:"bold",fontSize:'25',letterSpacing:1.3,marginTop:'50vh'}}>LOADING <span></span></div>)}  
      
      else if(display===4){return(<>
        <Redirect to="/adminsignin"/>
      </>)}
        
    }
}

export default Manager;