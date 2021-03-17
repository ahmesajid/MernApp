import React, { Component } from 'react';
import PannelSide from './Components/routes/LoginRoutes'
import UserSide from './Components/routes/UserRoutes'
import { Route, Switch} from "react-router-dom";

class Driver extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={UserSide} />
                    <Route exact path="/" component={UserSide} />
                    <Route exact path="/restaurant" component={UserSide}/>
                    <Route exact path="/about-us" component={UserSide} />
                    <Route exact path="/contact-us" component={UserSide} />
                    <Route exact path="/privacy-policy" component={UserSide} />
                    <Route exact path="/momentum" component={PannelSide} />
                    <Route exact path="/developersignIn" component={PannelSide} />
                    <Route exact path="/adminsignIn" component={PannelSide} />
                </Switch>
               
            </div>
        );
    }
}

export default Driver;