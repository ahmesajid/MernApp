import React, { Component } from 'react';
import axios from 'axios'
import '../../css/higherauthorities.css';
class HigherAuthorities extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }   
        this.deleteAllRestaurants = this.deleteAllRestaurants.bind(this)
        this.deleteAllAdmins = this.deleteAllAdmins.bind(this)
        this.deleteAllRecipes = this.deleteAllRecipes.bind(this)
        this.deleteAllBranches = this.deleteAllBranches.bind(this)
    }
    deleteAllRestaurants(){
        axios.delete('/restaurant/deleteAll')
        .then((data)=>{
            if(!data.data.status)
            {
                console.log("Restaurants couldn't deleted!");
            }
            else if(data.data.status===1)
            {
                alert("All restaurants deleted!")
            }
            else if(data.data.status===2){
                alert("All restaurants already deleted!")
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    }
    deleteAllBranches(){
        axios.delete('/branch/deleteAll')
        .then((data)=>{
            if(!data.data.status)
            {
                console.log("Branches couldn't deleted!");
            }
            else if(data.data.status===1)
            {
                alert(data.data.status)
                alert("All branches deleted!")
            }
            else if(data.data.status===2){
                alert("All branches already deleted!")
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    }
    deleteAllAdmins(){
        axios.delete('/admin/deleteAll')
        .then((data)=>{
            if(!data.data.status)
            {
                console.log("Admins of all restaurants couldn't deleted!");
            }
            else if(data.data.status===1)
            {
                alert("Admins of all restaurants deleted!")
            }
            else if(data.data.status===2){
                alert("All admins already deleted!")
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    }
    deleteAllRecipes(){
        axios.delete('/recipe/deleteAll')
        .then((data)=>{
            if(!data.data.status)
            {
                console.log(data.data.message);
            }
            else if(data.data.status===1)
            {
                alert("Recipes of all restaurants deleted!")
            }
            else if(data.data.status===2){
                alert("Recipes of all restaurants already deleted!!")
            }
        })
        .catch((e)=>{
            alert(e);
            console.log(e);
        });
    }
    componentDidMount=()=>{

    }

    
    render() {
        return (
            <>
                
                <div className=" higher-authorities-holder w-50 mx-auto"> 
                    <h1 className="higher-authorities-header">Note</h1>
                    <p className="higher-authorities-paragraph">Do these operations carefully , these can't be undone.</p>
                    <div className="d-flex flex-column justify-content-center align-content-center mx-auto">
                        <button className="btn btn-lg btn-danger m-2 shadow-sm" onClick={this.deleteAllRestaurants}>Delete All Restaurants</button>
                        <button className="btn btn-lg btn-danger m-2 shadow-sm" onClick={this.deleteAllBranches}>Delete All Branches</button>
                        <button className="btn btn-lg btn-danger m-2 shadow-sm" onClick={this.deleteAllAdmins}>Delete All Admins</button>
                        <button className="btn btn-lg btn-danger m-2 shadow-sm" onClick={this.deleteAllRecipes}>Delete All Recipes</button>
                    </div>

                </div>
            </>
        );
    }
}

export default HigherAuthorities;