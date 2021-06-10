import React, { Component } from 'react';
import axios from 'axios'
import DeveloperDashboard from '../backend-components/DeveloperDashboard'
class DeveloperSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      isLoggedIn:0
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.logoutDeveloper = this.logoutDeveloper.bind(this)
  }
  submitFormData=(e)=>{
    e.preventDefault();
    try {
      axios.post('/developer/signin',{gmail:this.state.email,password:this.state.password})
  .then((data)=>{
      if(data.data.status == "error")
      {
          alert(data.data.message);
      }
      else if(data.data.status == 1)
      {
        this.setState({
          isLoggedIn:1
        })
      }
      else if(data.data.status == 0)
      {
        alert("Invalid credentials!")
        this.setState({
          isLoggedIn:0
        })
      }
  })
  .catch((e)=>{
      alert(e);
      console.log(e);
  });
  } catch (error) {
      alert('Error occured retrieving developer who is logging in ' + error);
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
  logoutDeveloper(){
    this.setState({
      isLoggedIn:0
    })
  }
  render() {
    if(!this.state.isLoggedIn){
      return (
        <div className="holder">
          <div className="container sign-in-container-fluid text-center center-vertical">
          <form onSubmit={(e)=>this.submitFormData(e)}>
          <h1 className="add-new-style-header">Developer</h1>
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
            <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3 add-shadow">Sign In As A Developer</button>
          </form>
        </div>
        </div>
      );
    }else{
      return (
        <>
          <DeveloperDashboard logout={this.logoutDeveloper}/>
        </>
      )
    }
  }
}
export default DeveloperSignIn;