import React, { Component } from 'react';
import axios from 'axios'
import '../../css/deleteRestaurant.css';
class DeleteRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
        restaurants:[{}]
    };
    this.deleteRestaurant = this.deleteRestaurant.bind(this)
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
deleteRestaurant(e){
  e.preventDefault();
  const selectedRes = document.getElementById("custom-select-1").value;
  if(selectedRes){
    axios.post('/restaurant/delete',{resId:selectedRes})
    .then((data)=>{
        if(data.data.status == "error")
        {
            console.log(data.data.message);
        }
        else if(data.data.status == "ok")
        {
            alert("Selected restaurant deleted!\nKindly refresh page**")
        }
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
  }
  console.log(selectedRes);
}
  render() {
    return (
      <div>
        <div className="container vertical-center">
          <form className="mt-5 w-75 mx-auto">
          <h1>Delete Restaurants</h1>
            <div className="row">
              <div class="form-group">
                <select class="form-control"id="custom-select-1">
                  <option selected value={0}>Select restaurant to delete</option>
                  {
                    this.state.restaurants.map((restaurant,index)=>(
                    <option key={index} value={restaurant._id}>{restaurant.name}</option>
                    ))
                    }
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button onClick={this.deleteRestaurant} class="btn btn-lg btn-dark ">
                Delete This Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default DeleteRestaurant;    