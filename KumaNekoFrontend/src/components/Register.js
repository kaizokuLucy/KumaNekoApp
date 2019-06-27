import React from 'react';
import PropTypes from 'prop-types';


class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: { username: "", email: "", password: "" },
    };

    this.submitRegister = this.submitRegister.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  submitRegister = event => {
    if (this.state.username === "") {
      this.addError("username", "Username can't be empty");
    }
    if (this.state.email === "") {
      this.addError("email", "Email can't be empty");
    }
    if (this.state.password === "") {
      this.addError("password", "Password can't be empty");
    }
    if (this.state.username && this.state.email && this.state.password) {
      /*fetch("http://127.0.0.1:8000/register", {
        method: 'POST',
        header: 'Access-Control-Allow-Origin: *',
        body: JSON.stringify({ 'username': this.state.username, 'email': this.state.email, 'password': this.state.password }),
      })
        .then(x => x.json())
        .then(data => {
          if (data.message === 'error') {
            this.addError("username", "Username is taken");
          }
        });*/
      console.log("pokusaj registracije");
      this.props.handle_register(event, this.state);
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
    /*this.setState((prevState) => {
        let newArray = [];
        for(let e of prevState.errors) {
            if (element !== e.element) {
                newArray.push(e);
            }
        }
        return {errors: newArray};
    })*/
  }

  updateInput(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.removeError(event.target.name);
  }

  render() {
    let usernameError = this.state.errors["username"];
    let passwordError = this.state.errors["password"];
    let emailError = this.state.errors["email"];

    return (
      <form onSubmit={e => this.submitRegister(e)}>
        <div className="inner-container">
          <div className="header">
            Register
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
              <small className="danger-error">{emailError}</small>
              <label htmlFor="email">Email</label>
              <input
                className="login-input"
                type="text"
                name="email"
                placeholder="Email"
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

            <button className="login-btn" type="submit">Register</button>
            {/*<button className="login-btn" type="button" onClick={this.submitRegister}>Register</button>*/}
          </div>
        </div>
      </form>
    );
  }
}

RegisterBox.propTypes = {
  handle_register: PropTypes.func.isRequired
};

export default RegisterBox;