import React from 'react';
import { withRouter } from 'react-router-dom';
import './signup_form.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.demoLogin = this.demoLogin.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      // this.props.history.push('/login');
      let user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.login(user);
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history); 

  }

  // Demo User Login
  demoLogin(e) {
    e.preventDefault();

    const demoUser = {
      email: "demo@demo.com",
      password: "password123",
    };
    this.props.login(demoUser);
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <div className="signup-form-header"> Sign up to Netzero</div>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br/>
              <input type="email"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
                className="signup-email-input"
              />
            <br/>
              <input type="text"
                value={this.state.handle}
                onChange={this.update('handle')}
                placeholder="Handle"
                className="signup-handle-input"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
                className="signup-password-input"
              />
            <br/>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
                className="signup-password-input"
              />
            <br/>
            <input type="submit" className="signup-submit-button" value="Submit" />
            <br></br>
            <button className="demo-submit-button" onClick={this.demoLogin}>
              Demo User
            </button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);