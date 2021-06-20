import React, { Component } from 'react';
import axios from 'axios'
import '../global'

class DeleteRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recData:[{}]
    }
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  deleteRecipe(e){
    e.preventDefault();
    //RECIPE ID TO DELETE
    const rec = document.getElementById("custom-select")
    try {
      axios.post(`${global.backend}/recipe/delete` , {_id:rec.value})
      .then((data)=>{
      if(!data.data.status)
      {
          alert(data.data.message);
          console.log(data.data.message);
      }
      else if(data.data.status)
      {
          alert("Recipe deleted successfully!");
          this.componentDidMount();
      }
  })
  .catch((e)=>{
      alert(e);
      console.log(e);
  });
  } catch (error) {
      console.log(error);
  }

  }
  componentDidMount=()=>{
    axios.post(`${global.backend}/recipe/get`,{p_id:this.props.bData[0]._id})
    .then((data)=>{
        if(!data.data.status)
        {
            // alert(data.data.message);
            console.log(data.data.message);
        }
        else if(data.data.status)
        {
          this.setState({
            resData:data.data.resData
          })
          console.log(data.data.resData)
        }
    })
    .catch((e)=>{
        alert(e);
        console.log(e);
    });
  }
  render() {

    return (
      <div>
        <div className="container mt-5">
          <h1 className='add-new-style-header center-horizontal'>Delete Recipe</h1>
        <form className="mt-5">
          <div className="row">
          <div class="w-50 center-horizontal">
              <select class="form-control" id="custom-select">
                <option selected value={0}>Select Recipe</option>
                {this.state.resData?
                  this.state.resData.map(d=>(
                  <option value={d._id}>{d.name}</option>
                  )):<></>
                }
              </select>
            </div>
          </div>

          <br />
          <div className="d-flex justify-content-center">
            <button onClick={this.deleteRecipe} class="btn btn-dark ">
              Delete Recipe
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default DeleteRecipe;