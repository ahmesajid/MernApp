import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import LoginPannel from "../backend-components/LoginPannel";
import DeveloperSignIn from "../forms/DeveloperSignIn";
import AdminSignIn from "../forms/AdminSignIn";
class PannelSide extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/loginpannel" component={LoginPannel} />
                    <Route exact path="/developersignIn" component={DeveloperSignIn} />
                    <Route exact path="/adminsignIn" component={AdminSignIn} />
                </Switch>
            </div>
        );
    }
}

export default PannelSide;