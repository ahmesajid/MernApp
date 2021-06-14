import React, { Component } from 'react';
import axios from 'axios';
import '../../css/branchhome.css';
import DatePicker from 'react-date-picker';
class Branch_Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData:this.props.bData,
      bData:this.props.bData,
      selectedCity:this.props.selectedCity,
      selectedBranch:this.props.selectedBranch, //THIS IS ID
      thisBranchData:[{}],
      imgArr:[{}],
      recipes:[{}],
      isRecipe:0,
      name:null,
      email:null,
      persons:null,
      number:null,
      time:null,
      date:null
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }
  handleDateChange(e){
    this.setState({
      date:e.target.value
    })
  }
  handleTimeChange(e){
    this.setState({
      time:e.target.value
    })
  }
  handleNameChange(e){
    this.setState({
      name:e.target.value
    })
  }
  handleEmailChange(e){
    this.setState({
      email:e.target.value
    })
  }
  handlePersonChange(e){
    this.setState({
      persons:e.target.value
    })
  }
  handleNumberChange(e){
    this.setState({
      number:e.target.value
    })
  }
  reserveTable(e){
    e.preventDefault();
    const sendData = {
      name:this.state.name , 
      gmail:this.state.email , 
      number:this.state.number , 
      persons:this.state.persons , 
      resDate:this.state.date , 
      resTime:this.state.time , 
      b_id:this.props.selectedBranch
    }
    console.log(sendData);

    try {
      axios.post('/branch/add/reservation' , sendData )
      .then((data)=>{
        if(data.data.status){
          alert(data.data.message);}
          else{
            alert(data.data.message)
          }
      })
      .catch((e)=>{
          console.log(e);
      });
   } 
   catch (error) {
      console.log(error);
    }
  //   try {
  //     axios.post('/branch/addImages' , formData , config)
  //     .then((data)=>{
  //       if(data.data.status){
  //         alert("Images added successfuly!");
  //         this.setState({
  //           addedImages:data.data.files,
  //           isImagesAdded:true
  //         } , ()=>console.log(data.data.files))}
  //     })
  //     .catch((e)=>{
  //         console.log(e);
  //     });
  //  } 
  //  catch (error) {
  //     console.log(error);
  //   }


  }
  componentDidMount=()=>{
    axios.post('/branch/getdetails',{_id:this.state.selectedBranch})
    .then((data)=>{
        if(!data.data.status)
        {
            console.log(data.data.message);
        }
        else if(data.data.status)
        {
           this.setState({thisBranchData:data.data.bData})
        }
        let tempArr = [];
        let i=0;
        if(this.state.thisBranchData[0].fNames.length){
          while(i<this.state.thisBranchData[0].fNames.length){
            tempArr.push({fName:this.state.thisBranchData[0].fNames[i], id:`${i}`})
            ++i;
          }
        }
        this.setState({
          imgArr:tempArr
        })
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
    axios.post('/recipe/get',{p_id:this.state.selectedBranch})
          .then((data)=>{
              if(!data.data.status)
              {
                  // alert(data.data.message);
                  console.log(data.data.message);
              }
              else if(data.data.status === 1)
              {
                this.setState({
                  recipes:data.data.recData,
                  isRecipe:1
                })
                console.log(data.data.recData)
              }
              else if(data.data.status === -1)
              {
                this.setState({
                  isRecipe:-1
                })
              }
          })
          .catch((e)=>{
              alert(e);
              console.log(e);
          });

         
    }
  
  render() {
    return (
      <div style={{fontFamily:'cursive'}}>    
        <>
     
      <div id="restaurent" class="mt-2 carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
        {
          this.state.imgArr.map(fn=>( 
            <li data-target="#restaurent" data-slide-to={fn.id}></li>
        ))}  
          
        </ol>
        <div class="carousel-inner" role="listbox">
          
          {
            this.state.imgArr.map((fn , i)=>( 
              i==0?<>
              <div class="carousel-item active">
                <img class="hero-img" src={`/Images/Branches/${fn.fName}`} />
              </div>
              <div class="carousel-caption">
              <h2 style={{letterSpacing:1.3}}>{this.state.thisBranchData[0].name}</h2>
            </div></>:
            <div class="carousel-item">
            <img class="hero-img" src={`/Images/Branches/${fn.fName}`} />
            <div class="carousel-caption bg-dark" style={{opacity:0.7}}>
              <h2 style={{letterSpacing:1.3}}>{this.state.thisBranchData[0].name}</h2>
            </div>
            </div>
          ))}  
          
        </div>
      </div>
      <div className="ml-5 mr-5 mt-3 mb-2">
        <div className="row">
          {
            this.state.isRecipe == 1?
            <div className="col-md-7 mb-5">
            <h3 style={{ fontSize: "20px" }}>Restaurant Menu</h3>
            <hr />
            <div
              class="card mt-3"
              style={{
                backgroundColor: "#efefef",
                border: "none",
              }}
            >
              <div class="card-body">
                {/*Map Function (start)*/}
                <div className="row" style={{ fontSize: "17px" }}>
                      <div className="col-6">
                      <h5>Food Name</h5>
                        <p className="text-muted" style={{ fontSize: "13px" }}>
                      
                        </p>
                      </div>

                      <div className="col-6">
                 <p className="float-right"><h5>Food Price</h5></p>
                      </div>
                    </div>
                    <hr/>
               {
                 this.state.recipes.map((r, i)=>(
                  i%2===0?
                    <>
                    <div className="row" style={{ fontSize: "17px" , backgroundColor:"gray"}}>
                      <div className="col-6">{r.name}
                        <p className="text-muted" style={{ fontSize: "13px" }}>{r.description}</p>
                      </div>

                      <div className="col-6">
                        <p className="float-right">Rs/- {r.price}</p>
                      </div>
                    </div>
                    </>:
                    <>
                    <div className="row" style={{ fontSize: "17px" }}>
                      <div className="col-6">{r.name}
                        <p className="text-muted" style={{ fontSize: "13px" }}>{r.description}</p>
                      </div>
                      <div className="col-6">
                        <p className="float-right">Rs/- {r.price}</p>
                      </div>
                    </div>
                    </>

                 ))
               
               }
                {/*Map Function (End)*/}
              </div>
            </div>
          </div>:<div className="col-md-7 mb-5"><h3 style={{textAlign:"center",letterSpacing:1.5}}> No recipes yet</h3></div>
          }
          <div className="col-md-5">
            <div className=" d-flex justify-content-center">
              <button  data-toggle="modal" data-target="#exampleModal"
                type="submit"
                class="btn btn-dark btn-lg"
                style={{
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                  borderBottomLeftRadius: "50px",
                  width: "250px",
                  height: "50px",
                }}
              >
                Reserve Now
              </button>
            </div>

            {/*-----Show Timmings-------- */}
            <div className="mt-4">
              <h3 style={{ fontSize: "20px" }}>Our Timmings</h3>
              <hr />
              <div className="mt-3 pl-5 pr-5 pt-3 pb-3" style={{ backgroundColor: "#efefef",  }} >
                <div className="row pt-2 pb-2">
                  <div className="col-6">
                    <small>All Days</small>
                  </div>
                  <div className="col-3">
                    <small>{this.state.thisBranchData[0].opens}</small>
                  </div>
                  <div className="col-3">
                    <small>{this.state.thisBranchData[0].closes}</small>
                  </div>
                </div>
              </div>
            </div>
            {/*-----Show Contact-------- */}
            <div className="mt-4">
              <h3 style={{ fontSize: "20px" }}>Contact Info.</h3>
              <hr />
              <div
                className="mt-3"
                style={{
                  backgroundColor: "#efefef",
                }}
              >
                {/*Map Function (Start)*/}
                <div className="pl-3 pr-3 pt-3 row ">
                  <div className="col-4 d-flex justify-content-center">
                    <i class="fas fa-phone-alt fa-2x"></i>
                  </div>
                  <div className="col-8">{this.state.thisBranchData[0].contact}</div>
                </div>
                <div className="p-3 row d-flex justify-content-center">
                  <div className="col-4 d-flex justify-content-center">
                    <i class="fas fa-envelope fa-2x"></i>
                  </div>
                  <div className="col-8">{this.state.thisBranchData[0].gmail}</div>
                </div>
                {/*Map Function (End)*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        {/* ADD FORM HERE */}
        {/* ............................................................................ */}
        
        <form onSubmit={(e)=>this.reserveTable(e)}>
          <div className="d-flex justify-content-center">
            <h1 className="add-new-style-header">Make Reservation</h1>
          </div>
          <hr/>
          {/* DATE */}
          <input className="form-control m-2 p-2" label="reserve-date" type="date" name="date" value={this.state.date} onChange={this.handleDateChange}/>
          {/* TIME */}
          <div className="d-flex justify-content-center">
            <input className="form-control m-2 p-2" label="reserve-time" type="time" name="time" value={this.state.time} onChange={this.handleTimeChange}/>
          </div>
          {/* NAME */}
          <input class="form-control m-2 p-2" placeholder="Name" required value={this.state.name} onChange={this.handleNameChange}/>
          {/* EMAIL */}
          <input type="email" class="form-control m-2 p-2" placeholder="Email (Optional)" value={this.state.email} onChange={this.handleEmailChange}/>
          {/* NUMBER */}
          <input type="number" class="form-control m-2 p-2" placeholder="Your contact number" required value={this.state.number} onChange={this.handleNumberChange}/>
          {/* PERSONS */}
          <input type="number" class="form-control m-2 p-2" placeholder="Reserve for how many persons" required value={this.state.persons} onChange={this.handlePersonChange}/>
          <div className="d-flex justify-content-center">
            <button type="submit"class="btn btn-dark mx-auto">Make Reservation</button>
          </div>
          
        </form>
        {/* ............................................................................ */}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </div>
    );
  }
}

export default Branch_Show;