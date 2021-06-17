import React, { Component } from 'react';
import "../../css/restaurantlistshow.css";
import axios from 'axios'
import SelectBranch from '../frontend-components/FilterBranch';
import WaiterImage from '../../images/waiter.png';
class Rest extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
          isParent :false ,
          isChild :false ,
          branchesdetails:[] , 
          restaurantData:[] , 
          restaurantId:null,
          isLoaded:false
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
                    restaurantData:data.data.resData,
                    isLoaded:true,
                    isParent:true
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
  const {isChild , isParent , isLoaded} = this.state;
  if(isParent && isLoaded){
    return (
      <div className="container mt-3 p-2 bg-light"> <div className="d-flex justify-content-center mb-4"><span style={{letterSpacing:2,fontFamily:'sans-serif',fontSize:40,color:'darkslategrey',fontWeight:'bold'}}>Restaurant Cards</span></div>
        <div className="row justify-content-around">
          {this.state.restaurantData.map((rs) => (
            <div class="col-md-3 p-2 m-2 shadow bg-dark text-white card rounded" style={{width:'30rem'}} style={{cursor:'pointer'}}>
              <img class="card-img-top border-dark" src={`/Images/Restaurants/${rs.fName}`} alt="Card image cap" id={rs._id} onClick={this.showHome.bind(this , rs._id)}/>
              <div class="card-body">
                <h2 className="res-name-hover" style={{letterSpacing:2,fontFamily:'sans-serif'}}>{rs.name}</h2>
                <p className="small" style={{letterSpacing:1,fontFamily:'sans-serif',color:'blue'}}>branches{rs.branches}</p>
                <p class="card-text" style={{letterSpacing:1}}>{rs.description}</p>
              </div>
            </div>
          ))}
      </div>
      </div>
    );
  }else if(isChild && isLoaded){
   return(
     <div>
       <SelectBranch
      resId = {this.state.restaurantId} />
     </div>
   ) 
  }
  else if(!isLoaded){
    return(
      <div className=" mx-auto d-flex flex-row justify-content-center m-3 p-3">
        <div className="d-flex align-items-center">
          <h2 style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold'}}>Loading your restaurant data.</h2>
        </div>
        <div className="">
          <img src={WaiterImage} style={{width:'20vw',height:'50vh'}}/>
        </div>
      </div>
    )
  }
    
  }
}
export default Rest;
