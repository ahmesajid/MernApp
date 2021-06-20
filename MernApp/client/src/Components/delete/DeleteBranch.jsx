import React, { Component } from "react";
import axios from 'axios'
import $ from "jquery"; 
import "../../css/clock.css";
import '../../css/deleteBranch.css';
import '../global'
class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants:[{}],
      branches:[{}]
    };
  this.changeRestaurantBranches = this.changeRestaurantBranches.bind(this);
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
      axios.post(`${global.backend}/restaurant/cities`,{res:restaurantId})
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
deleteBranch(e){
  e.preventDefault();
  const selectedRes = document.getElementById("custom-select-restaurant").value;
  const selectedBranch = document.getElementById("custom-select-branches").value;
  if(selectedRes && selectedBranch){
    axios.post(`${global.backend}/branch/delete`,{bId:selectedBranch , pId:selectedRes})
    .then((data)=>{
        if(data.data.status == "error")
        {
            console.log(data.data.message);
        }
        else if(data.data.status == "ok")
        {
            alert("Selected branch deleted!")
            this.componentDidMount()
        }
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
  }
  console.log(selectedRes);
}
componentDidMount=()=>{
    try {
        axios.get(`${global.backend}/restaurant/get`)
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
        <div className="container w-75 mx-auto vertical-center"> 
        <h1>Delete Branches</h1>
        <form onSubmit={(e)=>this.deleteBranch(e)}>
            <div class="form-group" className="mt-3">
                <select class="form-control" id="custom-select-restaurant" onChange={this.changeRestaurantBranches}>
                    <option value={0}>Restaurants</option>
                    {
                        this.state.restaurants.map((restaurant,index)=>(
                        <option key={index} value={restaurant._id}>{restaurant.name}</option>
                        ))
                    }
                </select>
            </div>

            <div class="form-group" className="mt-3">
                <select class="form-control" id="custom-select-branches">
                    <option value={0}>Branches</option>
                    {
                        this.state.branches.map((branch,index)=>(
                        <option key={index} value={branch._id}>{branch.name}</option>
                        ))
                    }
                </select>
            </div>  

            <div className="d-flex justify-content-center" > 
                <button type="submit" class="btn btn-dark btn-lg mb-3 mt-3" >   Delete This Branch </button>
            </div>
        </form>
    </div>
    );
  }
}

export default Branch;