import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import LoginPannel from "../backend-components/LoginPannel";
import DeveloperSignIn from "../forms/DeveloperSignIn";
import AdminSignIn from "../forms/AdminSignIn";
import DeveloperDashboard from '../backend-components/DeveloperDashboard';
import AdminDashboard from '../backend-components/AdminDashboard';
class LoginRoutes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/developerdashboard" component={DeveloperDashboard} />
                    <Route exact path="/admindashboard" component={AdminDashboard} />
                    <Route exact path="/loginpannel" component={LoginPannel} />
                    <Route exact path="/developersignIn" component={DeveloperSignIn} />
                    <Route exact path="/adminsignIn" component={AdminSignIn} />
                </Switch>
            </div>
        );
    }
}

export default LoginRoutes;