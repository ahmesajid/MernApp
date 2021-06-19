import React, { Component } from "react";
import axios from 'axios'
import $ from "jquery";

class RemoveRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        branchId:null,
        branchData:null
    };
}
RemoveRecommendation(e){
    e.preventDefault();
    var branchIdSelected = $('#custom-select-branches option:selected').val()       
    console.log(branchIdSelected) 
    axios.post('/recommendation/delete',{_id:branchIdSelected})
    .then((data)=>{
        if(!data.data.status)
        {
            alert(data.data.message)
        }
        else
        {
            alert("Recommendation deleted successfully!***")
            this.componentDidMount()
        }
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
}
componentDidMount=()=>{
    try {
        axios.get('/recommendation/branch/get')
            .then((data)=>{
                if(!data.data.status )
                {
                    console.log("error getting recommendation branches");
                }
                else
                {
                    this.setState({
                        branchData:data.data.branchData
                    })
                    console.log(this.state.branchData)
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
      const{branchData} = this.state
    return (
        <div className="container w-50 text-center" style={{marginTop:"34vh"}}> 
        <form onSubmit={(e)=>this.RemoveRecommendation(e)}>
          <h2 className="p-2 m-2" style={{fontFamily:'sans-serif',letterSpacing:2,fontWeight:'bold'}}>Remove Recommendations</h2>
            
           <div class="form-group" className=" center-horizontal mt-3">
                <select class="form-control" id="custom-select-branches">
                    <option value="0">Branches</option>
                    {   branchData?
                        branchData.map((branch,index)=>(
                        <option key={index} value={branch._id}>{branch.name}</option>
                        )):''
                    }
                </select>
            </div>  

            <button type="submit"class="btn btn-dark btn-lg mb-3 mt-3">Remove Recommendation For This Branch</button>
        </form>
    </div>
    );
  }
}

export default RemoveRecommendation;
