import React from "react";
import "../../css/D_Dashboard.css";
import i from "../../images/Bezier.svg";
import Chart from "react-apexcharts";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import style from '../../css/D_Dashboard.module.css';
import axios from 'axios';
import AnalyticImage from '../../images/analytics.png'
import '../global'

export default class D_Dashboard extends React.Component {
  // var =null;
  constructor(props) {
    super(props);
    this.state = {
      isLoaded:null,
      restaurantCount:null,
      branchesCount:null,
      userIssueCount:null,
      managerIssueCount:null,
      reservationsCount:null,
      openIssuesCount:null,
      closedIssuesCount:null,
      openIssuesPercentage:null,
      closedIssuesPercentage:null,
      series:null,
      todoText:null,
      todoData:null,
      delId:null,
      options:[
      {
        series: [67],
        options: {
          chart: {
            height: 280,
            type: "radialBar",
          },

          series: [67],

          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "70%",
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#888",
                  fontSize: "13px",
                },
                value: {
                  color: "#111",
                  fontSize: "30px",
                  show: true,
                },
              },
            },
          },

          stroke: {
            lineCap: "round",
          },
          labels: ["Open Issues"],
        },
      },
      {
        series: [33],
        options: {
          chart: {
            height: 280,
            type: "radialBar",
          },

          series: [67],

          plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "70%",
              },

              dataLabels: {
                showOn: "always",
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#888",
                  fontSize: "13px",
                },
                value: {
                  color: "#111",
                  fontSize: "30px",
                  show: true,
                },
              },
            },
          },

          stroke: {
            lineCap: "round",
          },
          labels: ["close Issues"],
        },
      },
      {
        options: {
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: [
              "Day 1",
              "Day 2",
              "Day 3",
              "Day 4",
              "Day 5",
              "Day 6",
              "Day 7",
            ],
          },
        },
        series: [
          {
            name: "series-2",
            data: [30, 20, 30, 50, 75, 28, 79],
          },
        ],
      }, 
      {
        restaurantCount:5,
      }
    ]};
    this.handleTodo = this.handleTodo.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo= this.deleteTodo.bind(this)
    this.handleTodoValue = this.handleTodoValue.bind(this)
  }
  handleTodo(e){
    this.setState({todoText:e.target.value})
  }
  deleteTodo(){
    axios.post(`${global.backend}/todo/delete` , {delId:this.state.delId}).
    then(res=>console.log(res.data.message)).
    catch(err=>console.log(err))

    axios.get(`${global.backend}/todo/get`).
    then((res)=>{
      this.setState({todoData:res.data.todoData})
      console.log(res.data.todoData)
    }).
    catch(err=>console.log(err))
  }
  handleTodoValue(e){
    this.setState({
      delId:e.target.value
    })
  }
  addTodo(){
    axios.post(`${global.backend}/todo/post` , {todoText:this.state.todoText}).
    then(res=>console.log(res.data.message)).
    catch(err=>console.log(err))

    axios.get(`${global.backend}/todo/get`).
    then((res)=>{
      this.setState({todoData:res.data.todoData})
      console.log(res.data.todoData)
    }).
    catch(err=>console.log(err))
  }
  componentDidMount(){
    try {
      axios.get(`${global.backend}/todo/get`).
      then((res)=>{
        this.setState({todoData:res.data.todoData})
      }).
      catch(err=>console.log(err))

      axios.get(`${global.backend}/counts/all`)
      .then((res)=>{
        if(res.data){
          this.setState({
            isLoaded:true,
            restaurantCount:res.data.restaurantCount,
            branchesCount:res.data.branchesCount,
            userIssueCount:res.data.userIssueCount,
            managerIssueCount:res.data.managerIssueCount,
            reservationsCount:res.data.reservationsCount,
            openIssuesCount:res.data.openIssuesCount,
            closedIssuesCount:res.data.closedIssuesCount,
            openIssuesPercentage:res.data.openIssuesPercentage,
            closedIssuesPercentage:res.data.closedIssuesPercentage,
            series:res.data.series
          })
          
        }
      })
      .catch(err=>console.log(err))
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const {isLoaded} = this.state;
    if(isLoaded){
    return (
      <>
        <main>
        
          <div class="main__container">
            <div class="main__title">
              <img src={i} alt="" />
              <div class="main__greeting">
                <h1>Hello Developers</h1>
              </div>
            </div>

            <div class="main__cards">
              <div class={style.card}>
                <i
                  class="fas fa-cookie fa-2x text-lightblue"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p ">Total Restaurants : {this.state.restaurantCount}</p>
                  <span class="font-bold text-title"> </span>
                </div>
              </div>

              <div class={style.card}>
                <i
                  class="fas fa-project-diagram fa-2x text-lightblue"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p">Total Branches : {this.state.branchesCount}</p>
                  <span class="font-bold text-title"></span>
                </div>
              </div>

              <div class={style.card}>
                <i class="fas fa-bug fa-2x text-green" aria-hidden="true"></i>
                <div class="card_inner">
                  <p class="text-primary-p">Manager's Report Issues : {this.state.managerIssueCount}</p>
                  <span class="font-bold text-title"></span>
                </div>
              </div>

              <div class={style.card}>
                <i
                  class="fas fa-exclamation-triangle fa-2x text-green"
                  aria-hidden="true"
                ></i>
                <div class="card_inner">
                  <p class="text-primary-p">User's Report Issues : {this.state.userIssueCount}</p>
                  <span class="font-bold text-title"></span>
                </div>
              </div>

              <div class={style.card}>
                <i class="fas fa-box-tissue fa-2x " aria-hidden="true"></i>
                <div class="card_inner">
                  <p class="text-primary-p">Total Reservations : {this.state.reservationsCount}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div class="charts__left weeklyChart">
                  <div class="charts__left__title">
                    <div>
                      <h1>Reservation Weekly Report</h1>
                    </div>
                  </div>
                  <Chart
                    options={this.state.options[2].options}
                    series={this.state.series}
                    type="bar"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div class="charts__right issueChart">
                  <div class="charts__right__title">
                    <div>
                      <h1>Issues Report</h1>
                    </div>
                  </div>
                  <div>
                    <Chart
                      options={this.state.options[0].options}
                      series={this.state.openIssuesPercentage}
                      type="radialBar"
                      height={165}
                    />
                    <Chart
                      options={this.state.options[1].options}
                      series={this.state.closedIssuesPercentage}
                      type="radialBar"
                      height={165}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row calender">
              <div className="col-md-8">
                <div class="charts__left weeklyChart">
                  <div class="charts__left__title">
                    <div>
                      <h1>Todo Activities</h1>
                    </div>
                    <span>
                      <i
                        class="fas fa-plus-circle pr-2"
                        style={{ cursor: "pointer" }}
                        data-toggle="modal"
                        data-target="#addTODO"
                      ></i>

                      <i
                        class="fas fa-trash-alt"
                        style={{ cursor: "pointer" }}
                        data-toggle="modal"
                        data-target="#deleteTODO"
                      ></i>
                    </span>
                  </div>
                  <div style={{height: "35vh",overflowY: "scroll"}}>
                  {this.state.todoData.map((data , index)=>(
                      <p>{data.text}</p>
                  ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <CalendarComponent
                  className="rounded"
                  value={new Date()}
                  start="Decade"
                ></CalendarComponent>
              </div>
            </div>
          </div>
        </main>
        {/* Modal for ADD TODO */}
        <div
          class="modal fade"
          id="addTODO"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  ADD Todo.
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      placeholder="Enter..."
                      value={this.state.todoText}
                      onChange={this.handleTodo}
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" onClick={this.addTodo}>
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for delete TODO */}
        <div
          class="modal fade"
          id="deleteTODO"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                  Delete Todo.
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <select class="form-control form-control-sm" id="custom-select-1" onChange={this.handleTodoValue}>
                  <option selected>Select todo to delete</option>
                  {this.state.todoData.map((data,index)=>(
                    <option value={data._id}>{data.text}</option>
                  ))}
                  
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-dark" onClick={this.deleteTodo}>
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );}else{
      return(
        <div className="d-flex flex-row justify-content-center mx-auto" style={{marginTop:"30vh"}}>
          <div className="m-2">
            <img src={AnalyticImage} style={{width:'22vw',height:'40vh'}}/>
          </div>
          <div className="d-flex align-items-center ">
            <h2 className="m-2" style={{fontFamily:'sans-serif',letterSpacing:1.5,fontWeight:'bold'}}>Loading your analytics.</h2>
          </div>
      </div>
      )
    }
  }
}
