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
    resId:null
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
      <div>
        <div className="container-fluid mt-3">
          <div className="row d-flex justify-content-center">
            <img src={`/Images/Restaurants/${this.state.resData[0].fName}`} alt="logo" height="200vh" width="200vh" />
          </div>
        </div>
        <br/>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <form>
              <div class=" form-group">
                <select
                name="city"
                  class="form-control custom-select"
                  id="custom-select-1"
                  onChange={this.getChangeBehaviour}
                  style={{
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    borderBottomLeftRadius: "50px",
                    width: "45vw",
                  }}
                >
                  <option value={0}>Select restaurant city</option>
                  {
                    this.state.cities.map(c=>(
                    <option>{c.city}</option>
                    ))
                  }
                </select>
                <br />
                <select
                  class="form-control custom-select mt-3"
                  id="custom-select-2"
                  name="branch"
                  style={{
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    borderBottomLeftRadius: "50px",
                    width: "45vw"
                  }}
                >
                  <option value={0}>Select restaurant branch</option>
                  {
                    this.state.branches.map(b=>(
                    <option value={b._id}>{b.name}</option>
                    ))
                  }
                </select>
                <br />
                <button
                  type="button"
                  class="btn btn-dark btn-lg mt-3"
                  onClick={this.seeBranchDetails}
                  style={{
                    borderTopLeftRadius: "50px",
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    borderBottomLeftRadius: "50px",
                    width: "45vw",
                  }}
                >
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
