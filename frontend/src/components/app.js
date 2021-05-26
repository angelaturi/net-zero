import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import Splash from './splash/splash'
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import UserProfileContainer from './profile/user_profile_container';
import PledgeIndexContainer from './pledges/pledgeindex_container';
import PledgeShowContainer from './pledges/pledgeshow_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/home" component={MainPage} />
      <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
      <ProtectedRoute exact path="/pledges" component={PledgeIndexContainer} />
      <ProtectedRoute exact path="/pledges/:pledgeId" component={PledgeShowContainer} />
    </Switch>
  </div>
);

export default App;
