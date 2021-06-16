import React, { Component } from 'react';
import BranchHome from '../frontend-components/BranchHome'
import axios from 'axios';
import $ from 'jquery';
class Select_Branch extends Component {
 constructor(props) {
   super(props);
   this.state={
    resData:[{}],
    showDetails:false,
    cities:[],
    branches:[],
    selectedCity:"",
    selectedBranch:"",
    resId:this.props.resId
   }
   this.getChangeBehaviour = this.getChangeBehaviour.bind(this);
   this.seeBranchDetails = this.seeBranchDetails.bind(this);
 }
 seeBranchDetails(){
  const citySelected = document.getElementById("custom-select-1").value;
  const branchSelected = document.getElementById("custom-select-2").value;
  if(citySelected && branchSelected)
  {
    this.setState({
      showDetails:true,
      selectedCity:citySelected,
      selectedBranch:branchSelected
    })
  }
 }
 getChangeBehaviour=()=>{
  const selectedCity = document.getElementById("custom-select-1").value;
  axios.post('/restaurant/branches',{name:selectedCity , id:this.state.resData[0]._id})
  .then((data)=>{
      if(data.data.status == "error")
      {
          // alert(data.data.message);
          console.log(data.data.message);
      }
      else if(data.data.status == "ok")
      {
          this.setState({
              branches:data.data.branches
          })
      }
  })
  .catch((e)=>{
      alert(e);
      console.log(e);
  });
 
}
  componentDidMount=()=>{
    this.setState({
      resId:this.props.resId,
      resData:[{}]
    })
    // GET CITIES IN WHICH RESTAURANT BRANCHES ARE
    try {
      axios.post('/restaurant/cities',{res:this.props.resId})
          .then((data)=>{
              if(data.data.status == "error")
              {
                  // alert(data.data.message);
                  console.log(data.data.message);
              }
              else if(data.data.status == "ok")
              {
                  this.setState({
                      cities:data.data.cities
                  })
                  // alert("Branch details fetched successfully!");
                  console.log(this.state.cities);
              }

              //REMOVES MULTIPLE VALUE FROM SELECT LIST
              var map = {};
              $('select option').each(function () {
                  if (map[this.value]) {
                      $(this).remove()
                  }
                  map[this.value] = true;
              })
          })
          .catch((e)=>{
              alert(e);
              console.log(e);
          });
      //FETCHING RESTAURANT DATA
      axios.post('/restaurant/getsingle' , {_id:this.props.resId})
      .then((data)=>{
          if(data.data.status == "error")
          {
              // alert(data.data.message);
              console.log(data.data.message);
          }
          else if(data.data.status == "ok")
          {
              this.setState({
                  resData:data.data.res
              })
              console.log(this.state.resData);
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
    if(!this.state.showDetails){
    return (
      <div className="d-flex justify-content-center m-3 p-3">
        <div class="card m-2 rounded shadow p-2" style={{width:'50rem'}}>
        <img class="card-img-top" src={`/Images/Restaurants/${this.state.resData[0].fName}`} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title text-center" style={{fontWeight:'bold' , fontFamily:"sans-serif",letterSpacing:1.5,fontSize:35}} >{this.state.resData[0].name}</h5>
          <p class="card-text"></p>
          <form>
            <div class=" form-group">
              <select
              name="city"
                class="form-control custom-select rounded shadow"
                id="custom-select-1"
                onChange={this.getChangeBehaviour}>
                <option value={0}>Select restaurant city</option>
                {this.state.cities.map(c=>(
                  <option>{c.city}</option>))}
              </select>
              <br />
              <select
                class="form-control custom-select mt-3 rounded shadow"
                id="custom-select-2"
                name="branch">
                <option value={0}>Select restaurant branch</option>
                {this.state.branches.map(b=>(
                  <option value={b._id}>{b.name}</option>
                  ))}
              </select>
              <br />
              <button
                type="button"
                class="btn btn-secondary btn-block mt-3 rounded shadow"
                onClick={this.seeBranchDetails}>
                See Branch Details
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
    }
    else{
      return(
        <div>
          <BranchHome
          resData = {this.state.resData}
          bData = {this.state.branches}
          selectedCity = {this.state.selectedCity}
          selectedBranch = {this.state.selectedBranch}
          />
        </div>
      )
    }
  }
}

export default Select_Branch;
