/*mport React from 'react';
import '../sass/_loginSty.scss';
import LoginBox from './Login';
import RegisterBox from './Register';


class App extends React.Component {

  // localStorage = react component 
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    };

    this.showLoginBox = this.showLoginBox.bind(this);
    this.showRegisterBox = this.showRegisterBox.bind(this);

  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
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
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
        });
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
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
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
      </div>
    );
  }
}


export default App;*/