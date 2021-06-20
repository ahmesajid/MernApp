import React, { Component } from "react";
import axios from 'axios'
import $ from "jquery";
import '../global'

class AddRecommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        restaurantId:null,
        branchId:null,
        restaurants:null,
        branches:null
    };
    this.changeRestaurantBranches=this.changeRestaurantBranches.bind(this);
}
AddRecommendation(e){
    e.preventDefault();
    var branchIdSelected = $('#custom-select-branches option:selected').val()       
    console.log(branchIdSelected) 
    axios.post(`${global.backend}/recommendation/add`,{b_id:branchIdSelected})
    .then((data)=>{
        if(!data.data.status)
        {
            alert(data.data.message)
        }
        else
        {
            alert("Recommendation added successfully!***")
        }
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
}
changeRestaurantBranches(e){
    const restaurantId =  $("#custom-select-restaurant").find('option:selected').attr('value');
    console.log(restaurantId) 

    if(!restaurantId){this.setState({branches:null})}
    else{
        try {
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
        } catch (error) {
            console.log(error)
        }
    }
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
        <div className="container w-50 text-center " style={{marginTop:"34vh"}}> 
        <form onSubmit={(e)=>this.AddRecommendation(e)}>
          <h2 className="p-2 m-2" style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold'}}>Add Recommendations</h2>
           <div class="form-group" className="mt-3">
                <select class="form-control" id="custom-select-restaurant" onChange={this.changeRestaurantBranches}>
                    <option value="0">Restaurants</option>
                    {   this.state.restaurants?
                        this.state.restaurants.map((restaurant,index)=>(
                        <option key={index} value={restaurant._id}>{restaurant.name}</option>
                        )):""
                    }
                </select>
            </div>

            <div class="form-group" className=" center-horizontal mt-3">
                <select class="form-control" id="custom-select-branches">
                    <option>Branches</option>
                    {   this.state.branches?
                        this.state.branches.map((branch,index)=>(
                        <option key={index} value={branch._id}>{branch.name}</option>
                        )):''
                    }
                </select>
            </div>  

            <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3">Add Recommendation For This Branch</button>
        </form>
    </div>
    );
  }
}

export default AddRecommendations;
