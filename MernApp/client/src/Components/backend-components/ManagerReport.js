import React, { Component } from 'react';
import axios from 'axios';
class ManagerReport extends Component {
    constructor(props){
        super(props);

        this.state = {
            adminIssues:[{}],
            issueCount:0,
        }
    }
    componentDidMount(){
        try {
            //FETCHING RESTAURANTS
            axios.get('/issue/get/admin')
            .then((data)=>{
                if(data.data.status == "error")
                {
                    // alert(data.data.message);
                    console.log(data.data.message);
                }
                else if(data.data.status === 1)
                {
                    this.setState({
                        adminIssues:data.data.issues,
                        issueCount:data.data.issues.length,
                    },()=>console.log(this.state.issueCount));
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
        return (
            <div>
                <div className="d-flex justify-content-center m-4  p-4 flex-column p">
                    <div className="d-flex p-2 m-2">
                        <h1>
                            Manager Open Issues {this.state.issueCount?<><span style={{color:'green'}}>({this.state.issueCount})</span></>:<><span style={{color:'red'}}>({this.state.issueCount})</span></>}
                        </h1>
                    </div>
                    <div className="issue-list-holder">
                        {
                            this.state.adminIssues?
                            this.state.adminIssues.map((issue, index)=>(
                                <div className="d-flex flex-column bg-dark text-white p-2 m-4 rounded" >
                                    <div className="d-flex flex-row justify-content-between p-2 m-2"> 
                                        <div>
                                            <h3><p style={{letterSpacing:2}}>Issue #{index+1}</p></h3>
                                        </div>
                                        <div>
                                            <button type="button" className="btn btn-md btn-danger">Close Issue</button>
                                        </div>
                                    </div>
                                    <div className="mx-auto p-2"> <h6><p>{issue.description}</p></h6></div>
                                    <div className="ml-auto p-2 text-muted"> <p>{issue.time}</p></div>

                                </div>
                            )):
                            <></>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerReport;