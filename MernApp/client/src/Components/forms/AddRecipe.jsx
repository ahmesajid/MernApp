import React, { Component } from 'react';
import axios from 'axios';
import '../global'

class AddRecipe extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name:"",
            description:"",
            price:null,
            quantity:null,
            pieces:null,
            parentRestaurantDetails:"",
            gmail:"",
            b_id:this.props.bData[0]._id
        }

        this.handleNameChange  =this.handleNameChange.bind(this);
        this.handleDescriptionChange  =this.handleDescriptionChange.bind(this);
        this.handlePriceChange  =this.handlePriceChange.bind(this);
        this.handleQuantityChange=this.handleQuantityChange.bind(this);
        this.handlePiecesChange=this.handlePiecesChange.bind(this);
        this.addRecipe=this.addRecipe.bind(this);

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
    handlePriceChange(e){
        this.setState({
            price:e.target.value
        })
    }
    handleQuantityChange(e){
        this.setState({
            quantity:e.target.value
        })
    }
    handlePiecesChange(e){
        this.setState({
            pieces:e.target.value
        })
    }
    addRecipe(e){
        e.preventDefault();
        
        const addRecipe = {
            name:this.state.name,
            quantity:this.state.quantity,
            price:this.state.price,
            description:this.state.description,
            pieces:this.state.pieces,
            p_id:this.state.b_id,
        };
        console.log(addRecipe);

        // ADDING RECIPE
        try {
            axios.post(`${global.backend}/recipe/add` , addRecipe)
            .then((data)=>{
            if(data.data.status == "error")
            {
                alert(data.data.message);
                console.log(data.data.message);
            }
            else if(data.data.status == "ok")
            {
                alert("Recipe added successfully!");
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
    render() {
        return (
            <div>
                <div className="container text-center mt-5 justify-content-center">
                <h1 className='add-new-style-header center-horizontal'> Add A New Recipe  </h1>
                <form onSubmit={this.addRecipe}>
                    <div class="mt-5 w-50 form-group mx-auto">
                        <input type="text"placeholder="Recipe Name" class="form-control" id="name" value={this.state.name} onChange={this.handleNameChange}/>
                    </div>

                    <div class="form-group w-50 center-horizontal">
                        <input type="text"placeholder="Recipe Description" class="form-control" id="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
                    </div>
                    
                    <div class="form-group w-50 center-horizontal">
                        <input type="number" placeholder="Recipe Price"step='50' min='50' max='any' class="form-control" id="price" value={this.state.price} onChange={this.handlePriceChange}/>
                    </div>

                    <div class="form-group w-50 center-horizontal">
                        <input type="number" placeholder="Recipe Quantity"step='0.5' min='0' max='any'class="form-control" id="quantity" value={this.state.quantity} onChange={this.handleQuantityChange}/>
                    </div>

                    <div class="form-group w-50 center-horizontal">
                        <input type="number"placeholder="Pieces/Plates (optional)"step='1' min='0'max='any' class="form-control" id="pieces" value={this.state.pieces} onChange={this.handlePiecesChange}/>
                    </div>


                    <div className="d-flex mx-auto justify-content-center">
                        <button type="btn" class="btn btn-dark">Add Recipe</button>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default AddRecipe;