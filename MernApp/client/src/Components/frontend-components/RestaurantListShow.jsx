import React, { Component } from 'react';
import "../../css/restaurantlistshow.css";
import axios from 'axios'
import SelectBranch from '../frontend-components/FilterBranch'
class Rest extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
          isParent :true ,
          isChild :false ,
          branchesdetails:[] , 
          restaurantData:[] , 
          restaurantId:null
      }
      this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.setState({
      isParent :true ,
      isChild :false 
  })
  }
showHome(id){
  this.setState({
      isParent :false ,
      isChild :true ,
      restaurantId:id
  })
}
componentDidMount=()=>{
  this.goBack();
  this.setState({
    resData:[]
  })
    try {
        //FETCHING RESTAURANTS
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
                    restaurantData:data.data.resData
                })
                console.log(this.state.restaurantData)
                // alert("Restaurant fetched successfully!");
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
  if(this.state.isParent){
    return (
      <div>
        <div className="container-fluid mt-5">
          <h1>Restaurants</h1>
          <hr />
        </div>
              {this.state.restaurantData.map((rs) => (
                <div className="single-restaurant-list mt-3" id={rs._id} onClick={this.showHome.bind(this , rs._id)}>
                  <div className="d-flex restaurant-flex flex-row">
                    <div className="restaurant-list-photo p-3">
                      <div className="restaurant-image-box">
                        <img class="restaurant-list-img" src={`/Images/Restaurants/${rs.fName}`} />
                      </div>
                    </div>
                    <div className="restaurant-list-details p-3">
                      <div className="d-flex flex-column ">
                        <div className="d-flex flex-row align-items-center">
                          <div className="name p2">
                            <h2>
                                {rs.name}
                            </h2>
                            <hr />
                          </div>
                        </div>
                        <div className="mt-0">
                          <p className="text-muted pt-2">{rs.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        <br />
      </div>
    );
  }else if(this.state.isChild){
   return(
     <div>
       <SelectBranch
      resId = {this.state.restaurantId}/>
     </div>
   ) 
  }
    
  }
}
export default Rest;
