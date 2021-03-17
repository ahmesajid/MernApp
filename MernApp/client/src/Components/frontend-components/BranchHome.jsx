import React, { Component } from 'react';
import axios from 'axios';
import '../../css/branchhome.css'
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
      timeArray:[{}]

    }
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

          //ADDING DATA IN TIME ARRAY 
          let tempTimeArray = [];
          let days = ["Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" , "Sunday"];

          for (let index = 0; index < 7; index++) {
            tempTimeArray.push({
              opens:this.state.resData[0].opens,
              closes:this.state.resData[0].closes,
              days:days[index]
            })
          }
          this.setState({
            timeArray:tempTimeArray
          })
    }
  
  render() {
    return (
      <div>    
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
              i==0?
              <div class="carousel-item active">
            <img class="hero-img" src={`/Images/Restaurants/${fn.fName}`} />
            </div>:
            <div class="carousel-item">
            <img class="hero-img" src={`/Images/Restaurants/${fn.fName}`} />
            <div class="carousel-caption">
            <h3>{this.state.resData[0].name}</h3>
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
          </div>:<div className="col-md-7 mb-5"><h6 style={{textAlign:"center"}}> No recipes yet</h6></div>
          }
          <div className="col-md-5">
            <div className=" d-flex justify-content-center">
              <button
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
              <div
                className="mt-3 pl-5 pr-5 pt-3 pb-3"
                style={{
                  backgroundColor: "#efefef",
                }}
              >
                {/*Map Function (Start)*/}
                {this.state.timeArray.map(d=>(
                  <div className="row pt-2 pb-2">
                  <div className="col-6">
                    <small>{d.days}</small>
                  </div>
                  <div className="col-3">
                    <small>{d.opens}</small>
                  </div>
                  <div className="col-3">
                    <small>{d.closes}</small>
                  </div>
                </div>
                ))}
                {/*Map Function (End)*/}
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
                  <div className="col-8">{this.state.bData[0].contact}</div>
                </div>
                <div className="p-3 row d-flex justify-content-center">
                  <div className="col-4 d-flex justify-content-center">
                    <i class="fas fa-envelope fa-2x"></i>
                  </div>
                  <div className="col-8">{this.state.bData[0].gmail}</div>
                </div>
                {/*Map Function (End)*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
        
      </div>
    );
  }
}

export default Branch_Show;