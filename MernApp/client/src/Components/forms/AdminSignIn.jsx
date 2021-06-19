import React, { Component } from 'react';
import axios from 'axios'
import AdminDashboard from '../backend-components/AdminDashboard';
import {Redirect} from "react-router-dom";
class AdminSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      isLoggedIn:0,
      bData:[{}],
      aData:[{}]
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.logoutAdmin = this.logoutAdmin.bind(this)
  }
  logoutAdmin(){
    this.setState({
      isLoggedIn:0
    })
  }
  submitFormData=(e)=>{
    e.preventDefault();
    try {
      axios.post('/admin/signin',{gmail:this.state.email,password:this.state.password,getData:1,getData:1})
  .then((data)=>{
      if(data.data.status === "error")
      {
          alert(data.data.message);
      }
      else if(data.data.status === 1)
      {
        this.setState({
          isLoggedIn:1,
          bData:data.data.bData,
          aData:data.data.aData
        })
        console.log(data.data);
      }
      else if(data.data.status === 0)
      {
        this.setState({
          isLoggedIn:0
        })
        alert("No admin found with these credentials!**");
      }
      else if(data.data.status === 2){
        this.setState({
          isLoggedIn:1
        })
      }
  })
  .catch((e)=>{
      alert(e);
      console.log(e);
  });
  } catch (error) {
      alert('Error occured retrieving admin who is logging in ' + error);
  }
  }
  handleEmailChange(e){
    this.setState({
      email:e.target.value
    })

  }
  handlePasswordChange(e){
    this.setState({
      password:e.target.value
    })
  }
  render() {
    if(!this.state.isLoggedIn){
      return (
        <div className="holder">
          <div className="container sign-in-container-fluid text-center w-75">
          <form onSubmit={(e)=>this.submitFormData(e)}>
          <h1 className="add-new-style-header">Admin Sign In</h1>
            <br />
            <div class="row mt-3">
              <div class="set-40vw center-horizontal">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  value={this.state.email} onChange={this.handleEmailChange}
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="set-40vw center-horizontal">
                <input
                type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password} onChange={this.handlePasswordChange}
                />
              </div>
            </div>
            <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3 add-shadow">Sign In As A Admin</button>
          </form>
        </div>
        </div>
      );
    }else{
      if(this.state.bData && this.state.bData){
        return (
          <>
            <Redirect to="/admindashboard"/>
          </>
        )
      }
      
    }
  }
}

export default AdminSignIn;