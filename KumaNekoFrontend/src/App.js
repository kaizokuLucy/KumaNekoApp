import React from 'react';
import './sass/_loginSty.scss';
import LoginBox from './components/Login';
import RegisterBox from './components/Register';
import { Redirect } from 'react-router-dom';


class App extends React.Component {

  // localStorage = react component 
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      displayed_form: '',
      // logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      error: '',
    };

    this.showLoginBox = this.showLoginBox.bind(this);
    this.showRegisterBox = this.showRegisterBox.bind(this);

  }


  componentDidMount() {

    if (localStorage.getItem('token')) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log("JSON: " + JSON.stringify(json));
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.non_field_errors) {
          console.log("krivi podatci");
          this.setState({
            error: 'krivi podatci!',
          });
        } else {
          localStorage.setItem('token', json.token);
          localStorage.setItem('username', json.user.username);

          console.log(json.user.username);
          this.setState({
            // logged_in: true,
            displayed_form: '',
            username: json.user.username,
          });
        }
      });
  };

  handle_register = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 201) {
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .then(json => {
        console.log("OD BACKENDA ZA REGISTRACIJU SAM DOBIO " + JSON.stringify(json));
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.username);
        this.setState({
          // logged_in: true,
          displayed_form: '',
          username: json.username
        });
      }).catch(error => console.log("ERROR: " + error));
  };

  showLoginBox() {
    this.setState({ isRegisterOpen: false, isLoginOpen: true });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    let form;
    let loginClassName = "controller";
    let registerClassName = "controller";

    switch (this.state.isLoginOpen) {
      case true:
        form = <LoginBox handle_login={this.handle_login} />
        loginClassName += " selected-controller"
        break;
      case false:
        form = <RegisterBox handle_register={this.handle_register} />
        registerClassName += " selected-controller"
        break;
      default:
        break;
    }

    if (localStorage.getItem('token')) {
      console.log("hello tko god da jesi" );
      return <Redirect to="/home" />;
    }
    return (
      <div className="root-container">
        <div className="box-controller">
          <div
            className={loginClassName}
            onClick={this.showLoginBox}>
            Login
          </div>
          <div
            className={registerClassName}
            onClick={this.showRegisterBox}>
            Register
          </div>
        </div>

        <div className="box-container">
          {form}
        </div>
        <div>
          <h3 style={{ color: "red" }}>{this.state.error}</h3>
        </div>
      </div>
    );
  }
}


export default App;
