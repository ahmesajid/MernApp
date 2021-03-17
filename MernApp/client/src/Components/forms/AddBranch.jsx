import React, { Component } from "react";
import axios from 'axios'
import $ from "jquery"; 
import AddAdmin from '../forms/AddAdmin'
import "../../css/clock.css";
class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImagesAdded:null,
      addedImages:[{}],
      name:"",
      email:"",
      description:"",
      city:"",
      opens:"",
      closes:"",
      phone:null,
      restaurants:[],
      pId:""
    }
  
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNameChange  =this.handleNameChange.bind(this);
    this.handleEmailChange  =this.handleEmailChange.bind(this);
    this.handleDescriptionChange  =this.handleDescriptionChange.bind(this);
    this.handleOpenChange  =this.handleOpenChange.bind(this);
    this.handleCloseChange  =this.handleCloseChange.bind(this);
    this.handlePhoneChange  =this.handlePhoneChange.bind(this);
    
  }
  cities = ["Lahore" , "Islamabad" , "Karachi" , "Fiasalabad","Multan"];

  handleImageChange(e) {
    const SELECTED_IMAGES = e.target.files.length;
    const MAX_LENGTH = 3;
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    const formData = new FormData();    
    var i=0;
    if(SELECTED_IMAGES===3)
    {
      while(i<MAX_LENGTH)
      {
        formData.append('file',e.target.files[i]);
        i++;
      }
      //NOW SENDING ADD IMAGE REQUEST
      try {
        axios.post('/branch/addImages' , formData , config)
        .then((data)=>{
          if(data.data.status){
            alert("Images added successfuly!");
            this.setState({
              addedImages:data.data.files,
              isImagesAdded:true
            } , ()=>console.log(data.data.files))}
        })
        .catch((e)=>{
            console.log(e);
        });
     } 
     catch (error) {
        console.log(error);
      }
      //ADD IMAGE REQUEST COMPLETED

    }
    else{
      alert("Must select exactly three images for restaurant cover!")
    }
  }
  componentDidMount(){
    try {
      console.log("in try catch")
      axios.get('/restaurant/get')
      .then((data)=>{
          if(data.data.status == "error"){alert(data.data.message);}
          else if(data.data.status == "ok"){
            console.log(data.data.resData);
          this.setState({
            restaurants:data.data.resData
          })
          }
      }).catch((e)=>{
        alert(e);
          console.log(e);
      });
   } 
   catch (error) {console.log(error);}
  } 
  handleNameChange(e){
    this.setState({
        name:e.target.value
    })
}
handleDescriptionChange(e){
    this.setState({
        description:e.target.value
    })
}
handleEmailChange(e){
    this.setState({
        email:e.target.value
    })
}
handleOpenChange(e){
    this.setState({
        opens:e.target.value
    })
}
handleCloseChange(e){
    this.setState({
        closes:e.target.value
    })
}
handlePhoneChange(e){
    this.setState({
        phone:e.target.value
    })
}
addBranch=(e)=>{
    e.preventDefault();
    const elem = document.getElementById("custom-select-1").value;
    const pId = $("#custom-select-1").find('option:selected').attr('id');
    const city = $("#custom-select-2").val();
    this.setState({
        p_id:pId,
        city:city
    })
    if(this.state.isImagesAdded){
      //ADDING FILENAMES ARRAY
      let fileNames=[];
      for (let index = 0; index < 3; index++) {
        fileNames.push(this.state.addedImages[index].filename)
      }

      //PREPARING DATA
      const addBranch = {
        name:this.state.name,
        description:this.state.description,
        gmail:this.state.email,
        city:city,
        opens:this.state.opens,
        closes:this.state.closes,
        contact:this.state.phone,
        p_id:pId,
        fNames:fileNames
    };

      //SENDING POST REQUEST
      try {
        axios.post('/branch/add' , addBranch)
        .then((data)=>{
            if(data.data.status == "error")
            {
                alert(data.data.message);
                console.log(data.data.message);
            }
            else if(data.data.status == "ok")
            {
                alert(`${this.state.name} added successfully!`);
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    } catch (error) {
    }
    }
    else{
      alert("Select images for restaurant cover!")
    }
}

  render() {
    return (
      <div className="container-fluid text-center mt-5">
        <form onSubmit={(e)=>this.addBranch(e)}>
          {/* IMAGES */}
          <h1 className="add-new-style-header">Add A New Branch</h1>
          <div class="row mt-3">
            <div class="set-60vw center-horizontal">
              <h6 className="text-muted">Add 3 images simultaneously</h6>

              {
                this.state.isImagesAdded?
                (
                  <div id="carouselExampleControls" class="carousel slide"  data-ride="carousel">
                    <div class="carousel-inner" >
                    {
                      this.state.addedImages.map((imageDescription , index)=>(
                        index?
                        <div class="carousel-item">
                          <img class=" w-100" src={`/Images/Branches/${imageDescription.filename}`} style={{height:"250px"}} alt="First slide"/>
                        </div>:
                        <div class="carousel-item active">
                          <img class=" w-100" src={`/Images/Branches/${imageDescription.filename}`} style={{height:"250px"}} alt="First slide"/>
                        </div>
                      ))
                    }
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                    <br/>
                  </div>
                ):(<h6 className="text-muted">Images will load here</h6>)
              }
              

              <input type="file" multiple id="restaurant-image"  onChange={this.handleImageChange} />
            </div>
          </div>
          {/* BRANCH NAME */}
          <div class="row mt-3">
            <div class="set-60vw center-horizontal">
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Complete Branch Name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
          </div>
          {/* DESCRIPTION */}
          <div class="row mt-3">
            <div class="set-60vw center-horizontal">
              <textarea
                class="form-control"
                id="description"
                rows="3"
                placeholder="Add Branch Description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}                
              />
            </div>
          </div>
          {/* EMAIL */}
          <div class="row mt-3">
            <div class="set-60vw center-horizontal">
              <input
                type="email"
                class="form-control"
                placeholder="Branch e-mail"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
          </div>
          {/* CONTACT */}
          <div class="row mt-3">
            <div class="set-60vw center-horizontal">
              <input
                type="number"
                class="form-control"
                placeholder="Branch Contact Number"
                value={this.state.phone}
                onChange={this.handlePhoneChange}
              />
            </div>
          </div>
          {/* SELECT RESTAURANT */}
          <div class="row mt-3">
            <div class="set-60vw center-horizontal form-group">
              <select id="custom-select-1" class="form-control">
                {
                  this.state.restaurants.map((r,i)=>(
                    <option id={r._id}>{r.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
           {/* SELECT CITY */}
           <div class="row mt-3">
            <div class="set-60vw center-horizontal form-group">
              <h5>Select city for restaurant:</h5>
              <select id="custom-select-2" class="form-control">
              {
                this.cities.map(city =>(
                <option >{city}</option>
                ))
              }
              </select>
            </div>
          </div>
          {/* OPENS */}
          <div class="row mt-3">
            <div className="set-60vw center-horizontal">
              <input type="time"  name="open" id='open'value={this.state.opens} onChange={this.handleOpenChange}/>
            </div>
          </div>
          {/* CLOSES */}
          <div class="row mt-3">
            <div className="set-60vw center-horizontal">
              <input type="time" name="close" id='close'value={this.state.closes} onChange={this.handleCloseChange}/>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-dark btn-lg mb-3 mt-3"
            style={{ width: "35vh" }}
          >
            Add Branch
          </button>
        </form>
        <hr/>
        <AddAdmin/>
      </div>
    );
  }
}
export default Branch;