import React, { Component } from "react";
import axios from 'axios'
import $ from "jquery";
import "../../css/clock.css";

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        phone:null,
        email:"",
        password:"",
        city:"",
        cnic:null,
        restaurants:[{}],
        branches:[{}]
    };
    this.handleNameChange  =this.handleNameChange.bind(this);
    this.handleEmailChange  =this.handleEmailChange.bind(this);
    this.handlePhoneChange  =this.handlePhoneChange.bind(this);
    this.handlePasswordChange=this.handlePasswordChange.bind(this);
    this.handleCnicChange=this.handleCnicChange.bind(this);
    this.changeRestaurantBranches=this.changeRestaurantBranches.bind(this);
}
cities = ["Lahore" , "Karachi" , "Islamabad" , "Faisalabad" , "Multan" , "Sheikhupura" , 
              "Sialkot" , "Sukhur" , "Peshawar" , "Quetta" , "Rahim Yar Khan" ]
   
handleCnicChange(e){
    this.setState({
        cnic:e.target.value
    })
}
handleEmailChange(e){
    this.setState({
        email:e.target.value
    })
}
handlePhoneChange(e){
    this.setState({
        phone:e.target.value
    })
}
handleNameChange(e){
    this.setState({
        name:e.target.value
    })
}
handlePasswordChange(e){
    this.setState({
        password:e.target.value
    })
}
AddBranchAdmin(e){
    e.preventDefault();
    //THIS WILL GIVE ID OF THE SELECTED RESTAURANT
    var restaurantIdSelected = $('#custom-select-restaurant option:selected').val()
    var branchIdSelected = $('#custom-select-branches option:selected').val()
    var selectedCity = $('#custom-select-admin-city').val()
    
    let branchAdminCredentials = {
        name:this.state.name ,
        phone:this.state.phone,
        gmail:this.state.email,
        password:this.state.password,
        admin_city:selectedCity,
        branch_id:branchIdSelected,
        cnic:this.state.cnic
    };
        console.log(branchAdminCredentials);
        
        axios.post('/admin/signup',{branchAdminCredentials:branchAdminCredentials})
            .then((data)=>{
                if(data.data.status == "error")
                {
                   alert(data.data.message)
                }
                else if(data.data.status == "ok")
                {
                    alert("Branch admin added successfully!***")
                }
            })
            .catch((e)=>{
                alert(e);
                console.log(e);
            });
}
changeRestaurantBranches(e){
    const restaurantName = document.getElementById("custom-select-restaurant").value;
    const restaurantId =  $("#custom-select-restaurant").find('option:selected').attr('value');
    if(restaurantName=="none")
    {

        $("#custom-select-branches").append($('<option>',{
            selected:true , 
            text:'none'
        }))
    }
    else{
        axios.post('/restaurant/cities',{res:restaurantId})
        .then((data)=>{
            if(data.data.status == "error")
            {
                // alert(data.data.message);
                console.log(data.data.message);
            }
            else if(data.data.status == "ok")
            {
                this.setState({
                    branches:data.data.cities
                })
                console.log(data.data.cities)
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    }
}
componentDidMount=()=>{
    try {
        axios.get('/restaurant/get')
            .then((data)=>{
                if(data.data.status == "error")
                {
                    // alert(data.data.message);
                    console.log(data.data.message);
                }
                else if(data.data.status == "ok")
                {
                    this.setState({
                        restaurants:data.data.resData
                    })
                    // alert("Branch details fetched successfully!");
                    console.log(this.state.restaurants);
                }
            })
            .catch((e)=>{
                alert(e);
                console.log(e);
            });
      } catch (error) {
      }
}

  render() {
    return (
        <div className="container-fluid text-center mt-5"> 
        <form onSubmit={(e)=>this.AddBranchAdmin(e)}>
            <div class="form-group"className="set-60vw center-horizontal mt-3">
                <input type="text" placeholder="Admin Name"class="form-control" id="name" value={this.state.name} onChange={this.handleNameChange}/>
            </div>

            <div class="form-group"className="set-60vw center-horizontal mt-3">
                <input type="number"placeholder="Admin Number" class="form-control" id="phone" value={this.state.phone} onChange={this.handlePhoneChange}/>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <input type="email" placeholder="Admin Email" class="form-control" id="email" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <input type="number" placeholder="Admin CNIC"class="form-control" id="cnic" value={this.state.cnic} onChange={this.handleCnicChange}/>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <input type="password" placeholder="Admin Password"class="form-control" id="password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <label for="sel2">Select City Where Admin Belongs To:</label>
                <select class="form-control" id="custom-select-admin-city">
                    <option selected>Cities</option>
                    {
                        this.cities.map((city,index)=>(
                        <option key={index}>{city}</option>
                         ))
                    }
                </select>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <select class="form-control" id="custom-select-restaurant" onChange={this.changeRestaurantBranches}>
                    <option>Restaurants</option>
                    {
                        this.state.restaurants.map((restaurant,index)=>(
                        <option key={index} value={restaurant._id}>{restaurant.name}</option>
                        ))
                    }
                </select>
            </div>

            <div class="form-group" className="set-60vw center-horizontal mt-3">
                <select class="form-control" id="custom-select-branches">
                    <option>Branches</option>
                    {
                        this.state.branches.map((branch,index)=>(
                        <option key={index} value={branch._id}>{branch.name}</option>
                        ))
                    }
                </select>
            </div>  

            <button
            type="submit"
            class="btn btn-dark btn-lg mb-3 mt-3"
            style={{ width: "25vh" }}
          >
            Add Admin
          </button>
        </form>
    </div>
    );
  }
}

export default Branch;
