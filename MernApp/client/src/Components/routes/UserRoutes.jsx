import React, { Component } from 'react';
import { Route, Switch} from "react-router-dom";
import Home from '../frontend-components/LandingHome'
import Restaurants from '../frontend-components/RestaurantListShow'
import ContactUs from '../frontend-components/ContactUs'
import AboutUs from '../frontend-components/AboutUs'
import PrivacyPolicy from '../frontend-components/PrivacyPolicy'
import NavBar from '../frontend-components/NavBar'
import Footer from '../frontend-components/Footer'
import CreateIssue from '../forms/CreateIssue';
class UserSide extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurant" component={Restaurants}/>
                    <Route exact path="/about-us" component={AboutUs} />
                    <Route exact path="/contact-us" component={ContactUs} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/create-issue" component={CreateIssue} />
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default UserSide;