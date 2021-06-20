import React, { Component } from "react";
import axios from 'axios'
import '../../css/deleteRestaurant.css';
import '../global'

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      description:"",
      email:"",
      aData:null
    };

    this.handleTitleChange  =this.handleTitleChange.bind(this);
    this.handleDescriptionChange  =this.handleDescriptionChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }
  
  handleTitleChange(e){
    this.setState({
        title:e.target.value
    })
}
handleEmailChange(e){
    this.setState({
        email:e.target.value
    })
}
handleDescriptionChange(e){
    this.setState({
        description:e.target.value
    })
}
componentDidMount(){
    if(this.props.aData){
        this.setState({
            aData:this.props.aData
        })
    }
}
createIssue(e){
    e.preventDefault();
    let sendData=null;
    console.log(this.state.aData);
    if(this.state.aData){
        sendData = {
            description:this.state.description,
            email:this.state.aData[0].gmail,
            title:this.state.title,
            isAdmin:true,
            a_id:this.state.aData[0]._id
        };
    }else{
        sendData = {
            description:this.state.description,
            email:this.state.email,
            title:this.state.title,
            isUser:true
        };
    }
    
    console.log(sendData)
    try {
        axios.post(`${global.backend}/issue/post` , sendData)
        .then((data)=>{
            if(data.data.status == "error")
            {
                alert(data.data.message);
            }
            else if(data.data.status)
            {
                alert("Issue has been created successfully");
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
     } 
     catch (error) {
        console.log(error);
      }
}
  render() {
    return (
      <div className="container text-center vertical-center">
        <form onSubmit={(e)=>this.createIssue(e)}>
        <h1 className="add-new-style-header">Create A New Issue</h1>
          <br />

          {/* EMAIL */}
          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <input
                type="email"
                class="form-control"
                placeholder="Official Email"
                required
                value={this.state.email} onChange={this.handleEmailChange}
              />
            </div>
          </div>

            {/* TITLE */}
          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <input
                class="form-control"
                placeholder="Title of Issue"
                required
                value={this.state.phone} onChange={this.handleTitleChange}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
                required
                value={this.state.description} onChange={this.handleDescriptionChange}
              />
            </div>
          </div>
          <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3">Create An Issue</button>
        </form>
      </div>
    );
  }
}
export default Restaurant;