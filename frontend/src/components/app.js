import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import Splash from "./splash/splash";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import UserProfileContainer from "./profile/user_profile_container";
import PledgeIndexContainer from "./pledges/pledgeindex_container";
import PledgeShowContainer from "./pledges/pledgeshow_container";
import AboutUs from "./splash/AboutUs/aboutus";
import user_show_container from "./user_show/user_show_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/aboutus" component={AboutUs} />
      <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
      <ProtectedRoute exact path="/pledges" component={PledgeIndexContainer} />
      <ProtectedRoute
        exact
        path="/pledges/:pledgeId"
        component={PledgeShowContainer}
      />
      <ProtectedRoute exact path="/users/:userId" component={user_show_container} />
    </Switch>
  </div>
);

export default App;
