import axios from 'axios';
import React, { Component } from 'react';
class ProfileBranch extends Component {
  constructor(props){
    super(props);

    this.state = {
      isHome:true,
      isReservations:false,
      adminId:this.props.adminId,
      reservations:null,
      reservationData:[{}]
    }
    this.showHome = this.showHome.bind(this);
    this.showReservations = this.showReservations.bind(this);
  }
  showHome(){
    this.setState({isHome:true,isReservations:false});
  }
  showReservations(){
    this.setState({isReservations:true,isHome:false});
  }
  componentDidMount(){
    axios.post('/reservation/get/id' , {id:this.state.adminId})
    .then((data)=>{
      if(data.data.status){
        this.setState({
          reservations:true,
          reservationData:data.data.reservationData
        })
        console.log(data.data.reservationData);
      }
      else{
        this.setState({
          reservations:null
        })
        alert("No reservation yet!");
      }
    })
    .catch(err=>console.log(err))
  }
  render() {
    const {isHome , isReservations , reservations , reservationData} = this.state;
    if(isHome){
      return (
        <div>
          <div class="card bg-light shadow text-center m-4 p-4">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <button class="nav-link active" onClick={this.showHome}>My Home</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" onClick={this.showReservations}>Reservations</button>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Ask a new feature</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
      );
    }
    else if(isReservations){
      return (
        <div>
          <div class="card text-center shadow bg-light  m-4 p-2" style={{fontFamily:'sans-serif'}}>
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <button class="nav-link" onClick={this.showHome}>My Home</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link active" onClick={this.showReservations}>Reservations</button>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Ask a new feature</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <h5 class="card-title">Here is all of your reservations</h5>
              <p class="card-text">We always work for your convenience. We developers team!</p>
              {/* ......................................................... */}
              <div class="row">
                {reservations?
                reservationData.map((data , index)=>(
                  <div class="col-sm-6">
                  <div class="card bg-dark text-white shadow m-2">
                    <div class="card-body">
                      <span><h5 class="card-title">Reservation made by {data.name}</h5><span className="text-muted small" style={{color:'green',letterSpacing:1}}>email also sent to {data.gmail}</span></span>
                      <p class="card-text">Number of persons attending the table will be {data.persons}.</p>
                      <p class="card-text">Reservation is on {data.resDate} </p>
                      <p class="card-text">at {data.time}.</p>
                    
                    </div>
                  </div>
                </div>
                ))
                :
                <></>}
              </div>
              {/* ......................................................... */}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProfileBranch;