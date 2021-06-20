import { Route, Switch} from "react-router-dom";
import ComponentA from "./Components/Test/ComponentA";
import Driver from './Driver'
import React, { Component } from 'react';
import ComponentB from "./Components/Test/ComponentB";

class App extends Component {
  
  render() {
    // console.log("A render")
    return (
      <div>
        {/* <ComponentB/> */}
         <Driver/>
      {/* <ComponentA/> */}
      </div>
    );
  }
}

export default App;