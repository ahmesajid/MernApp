import React, { Component } from 'react';
import "../../css/restaurantlistshow.css";
import axios from 'axios'
import SelectBranch from '../frontend-components/FilterBranch';
import WaiterImage from '../../images/waiter.png';
import '../global'
class Rest extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
          isParent :false ,
          isChild :false ,
          branchesdetails:[] , 
          restaurantData:[] , 
          restaurantId:null,
          isLoaded:false,
          restaurantNames:null,
          count:0,
          searchResults:null
      }
      this.onChange = this.onInputChange.bind(this);
  }
  
showHome(id){
  this.setState({
      isParent :false ,
      isChild :true ,
      restaurantId:id
  })
}
showResults(e){
   //FETCHING RESTAURANT DATA
   axios.post(`${global.backend}/restaurant/getsingle` , {_id:e})
   .then((data)=>{
       if(data.data.status == "error")
       {
           console.log(data.data.message);
       }
       else if(data.data.status == "ok")
       {
           this.setState({
               searchResults:data.data.res
           })
           console.log(this.state.searchResults);
       }
   })
   .catch((e)=>{
       alert(e);
       console.log(e);
   });
}
onInputChange(){
   //RESTAURANT FILTERED RESULTS
   const inpElem = document.getElementById("restaurant-search")
   const inputValue = inpElem.value.trim()

   if(inputValue && inputValue.length>2 && (document.activeElement.id==="restaurant-search")){
     console.log(inputValue.length)
       axios.post(`${global.backend}/restaurant/search/get/names`, {name:inputValue})
       .then((res)=>{
           if(res.data.isResult){
               console.log("res fetched")
               this.setState({restaurantNames:res.data.restaurantNames,count:inputValue.length})
           }
           else{
               console.log("res not fetched")
               this.setState({restaurantNames:null ,count:0})
           }
       })
       .catch(err=>console.log(err))
   }else {
    this.setState({restaurantNames:null,isRestaurantNames:false,count:0,searchResults:null})
   }
   //RESTAURANT FILTERED RESULTS ENDS
}
componentDidMount=()=>{
  this.setState({
    resData:[]
  })
    try {
        //FETCHING RESTAURANTS
        axios.get(`${global.backend}/restaurant/get`)
        .then((data)=>{
            if(data.data.status == "error")
            {
                // alert(data.data.message);
                console.log(data.data.message);
            }
            else if(data.data.status == "ok" && data.data.resData.length)
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
  const {isChild , isParent , isLoaded , restaurantNames} = this.state;
  if(isParent && isLoaded){
    return (
      <>
      {global.backend}
      <div className="search-holder form-control w-70 bg-secondary text-white mx-auto">
            <div><input className="form-control" id="restaurant-search"  onChange={this.onChange} placeholder="search your restaurant" onKeyDown={(e) => { if (e.key === "Backspace" && e.target.value.length==1) { this.onInputChange() }}} /></div>
              <div className="results-holder rounded shadow" id="results-holder">

                  {this.state.count !=0?
                  this.state.restaurantNames.map((res , i)=>(
                      <div className=" d-flex flex-row justify-content-between p-1 m-1" style={{cursor:'pointer'}} id={res._id} onClick={this.showResults.bind(this , res._id)}>
                          <div style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold',fontSize:15}} >{res.name}</div>
                          <div><img src={`${global.backend}/Images/Restaurants/${res.fName}`} style={{width:'5vw',height:'5vh'}}/></div>
                      </div>
                  )):''}
          </div>
        </div>

        {this.state.searchResults?
        <div className="container mt-4 mb-4 p-2 bg-light"> <div className="d-flex justify-content-center mb-4"><span style={{letterSpacing:2,fontFamily:'sans-serif',fontSize:40,color:'darkslategrey',fontWeight:'bold'}}>Restaurant Cards</span></div>
          <div className="row justify-content-around">
            {this.state.searchResults.map((rs) => (
              <div class="col-md-3 p-2 m-2 shadow bg-dark text-white card rounded" style={{width:'30rem'}} style={{cursor:'pointer'}}>
                <img class="card-img-top border-dark" src={`${global.backend}/Images/Restaurants/${rs.fName}`} alt="Card image cap" id={rs._id} onClick={this.showHome.bind(this , rs._id)}/>
                <div class="card-body">
                  <h2 className="res-name-hover" style={{letterSpacing:2,fontFamily:'sans-serif'}}>{rs.name}</h2>
                  <p className="small" style={{letterSpacing:1,fontFamily:'sans-serif',color:'blue'}}>branches{rs.branches}</p>
                  <p class="card-text" style={{letterSpacing:1}}>{rs.description}</p>
                </div>
              </div>
             ))}
          </div>
        </div>
        :
        <div className="container mt-4 mb-4 p-2 bg-light"> <div className="d-flex justify-content-center mb-4"><span style={{letterSpacing:2,fontFamily:'sans-serif',fontSize:40,color:'darkslategrey',fontWeight:'bold'}}>Restaurant Cards</span></div>
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
        }
       
      </>
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
      <div className=" mx-auto d-flex flex-row justify-content-center mt-4 mb-4 pt-4 pb-4">
        <div className="d-flex align-items-center">
          <h2 className="p-2 m-2" style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold'}}>Your restaurant data will load here.</h2>
        </div>
        <div className="p-2 m-2">
          <img src={WaiterImage} style={{width:'22vw',height:'48vh'}}/>
        </div>
      </div>
    )
  }
    
  }
}
export default Rest;
