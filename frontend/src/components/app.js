import React from 'react';
import { AuthRoute, ProtectedRoute, Route } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import Splash from './splash/splash'
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
    <div>
      <NavBarContainer />
      <Switch>
          <AuthRoute exact path="/" component={Splash} />
          <AuthRoute exact path="/home" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>
    </div>
  );

export default App;