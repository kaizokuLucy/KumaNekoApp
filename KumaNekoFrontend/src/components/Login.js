import React from 'react';
import PropTypes from 'prop-types';


class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: { username: "", password: "" },
    };

    this.submitLogin = this.submitLogin.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  submitLogin(event) {
    if (this.state.username === "") {
      this.addError("username", "Username can't be empty");
    }
    if (this.state.password === "") {
      this.addError("password", "Password can't be empty");
    }

    if (this.state.username && this.state.password) {
      console.log("pokusaj logina");
      this.props.handle_login(event, {"username": this.state.username, "password": this.state.password});
    }
  }

  addError(element, message) {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [element]: message,
      }
    }));
  }

  removeError(element) {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [element]: "",
      }
    }));
  }

  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.removeError(event.target.name);
  }

  render() {
    let usernameError = this.state.errors["username"];
    let passwordError = this.state.errors["password"];

    return (
      <div className="inner-container">
        <div className="header">
          Login
                </div>
        <div className="box">
          <div className="input-group">
            <small className="danger-error">{usernameError}</small>
            <label htmlFor="username">Username</label>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.updateInput}
            />
          </div>

          <div className="input-group">
            <small className="danger-error">{passwordError}</small>
            <label htmlFor="password">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.updateInput}
            />
          </div>

          <button className="login-btn" type="button" onClick={this.submitLogin}>Login</button>
          {/*<button className="login-btn" type="submit">Login</button>*/}
        </div>
      </div>
    );
  }
}

LoginBox.propTypes = {
  handle_login: PropTypes.func.isRequired
};

export default LoginBox;