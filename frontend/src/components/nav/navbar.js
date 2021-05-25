import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="header">
              <nav className="main-header">
                <div className="top-header"> 
                <Link to={'/events'} className="events-button-header" style={{ textDecoration: 'none' }}>Events</Link>
                <Link to={'/profile'} className="profile-button-header" style={{ textDecoration: 'none' }}>Profile</Link>
                <button className="navbar-logout-button" onClick={this.logoutUser}>Logout</button>
                </div>
              </nav>
            </div>
        );
      } else {
        return (
            <div className="header">
              <nav className="main-header">
                <div className="top-header"> 
                <div><Link to={'/signup'} className="signup-button-header" style={{ textDecoration: 'none' }}>Signup</Link></div>
                <div><Link to={'/login'} className="login-button-header" style={{ textDecoration: 'none' }}>Login</Link></div>
                </div>
                </nav>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
            <div className="logo-placeholder">NETZERO</div>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;