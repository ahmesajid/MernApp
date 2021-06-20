import React, { Component } from "react";
import axios from 'axios'
import '../../css/deleteRestaurant.css';
import '../global'

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      description:"",
      email:"",
      phone:null,
      //FOR IMAGE
      file:[{filename:null}]
    };

    this.handleNameChange  =this.handleNameChange.bind(this);
    this.handleEmailChange  =this.handleEmailChange.bind(this);
    this.handlePhoneChange  =this.handlePhoneChange.bind(this);
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    this.handleImageChange=this.handleImageChange.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',e.target.files[0]);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    try {
      axios.post(`${global.backend}/restaurant/upload`,formData,config)
            .then((response) => {
              console.log(response.data)
                this.setState({
                  file:[response.data]
                },()=>console.log(this.state.file))
            }).catch((error) => {
              console.log(error);
        });  
     } 
     catch (error) {
        console.log(error);
      }
  }
  handleNameChange(e){
    this.setState({
        name:e.target.value
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
addRestaurant(e){
    e.preventDefault();
    let sendData = {
        name:this.state.name ,
        description:this.state.description,
        gmail:this.state.email,
        fName:this.state.file[0].filename,
        phone:this.state.phone
    };
    console.log(sendData)
    try {
        axios.post(`${global.backend}/restaurant/add` , sendData)
        .then((data)=>{
            if(data.data.status == "error")
            {
                alert(data.data.message);
            }
            else if(data.data.status == "ok")
            {
                alert("Restaurant has been added successfully");
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
handlePhoneChange(e){
  this.setState({
      phone:e.target.value
  })
}
  render() {
    return (
      <div className="container text-center vertical-center">
        <form onSubmit={(e)=>this.addRestaurant(e)}>
        <h1 className="add-new-style-header">Add A New Restaurant</h1>
          <br />
          <div class="row mt-3 mx-auto">
            <div class="col-8 mx-auto">
              <div className="show-image">
                  {this.state.file[0].filename?<img  style={{width:250,height:250}}  src={`/Images/Restaurants/${this.state.file[0].filename}`}/>:""}
              </div>
              <br/>
              <label for="restaurant-image"><h3 className="header-3">Pick a logo for restaurant:*</h3></label>
              <input type="file" name="myImage" id="restaurant-image"  onChange={this.handleImageChange} />
              
            </div>
          </div>
          <div class="row mt-3 ">
            <div class="col-8 mx-auto">
              <input
                type="text"
                class="form-control"
                placeholder="Restaurant Name"
                required
                value={this.state.name} onChange={this.handleNameChange}
              />
            </div>
          </div>
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

          <div class="row mt-3">
            <div class="col-8 mx-auto">
              <input
                type="number"
                class="form-control"
                placeholder="Official Contact"
                required
                value={this.state.phone} onChange={this.handlePhoneChange}
              />
            </div>
          </div>
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
          <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3">Add Restaurant</button>
        </form>
      </div>
    );
  }
}
export default Restaurant;