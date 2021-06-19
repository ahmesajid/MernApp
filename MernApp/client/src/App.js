import { Route, Switch} from "react-router-dom";
import ComponentA from "./Components/Test/ComponentA";
import Driver from './Driver'
import React, { Component } from 'react';

class App extends Component {
  
  render() {
    // console.log("A render")
    return (
      <div>
         <Driver/>
      {/* <ComponentA/> */}
      </div>
    );
  }
}

export default App;