import React from 'react';
import './Home.scss';
import NavbarCustom from './NavbarCustom';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import mascot from '../resources/logo/red_panda/study_final.png';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img from '../resources/logo/red_panda/bamboo/bamboo-sukoi.png';


class Home extends React.Component {

  handle_logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };


  // css body
  componentDidMount() {
    console.log("mount");
      //document.body.style.backgroundColor = '#FF00FF';
      //document.body.style.backgroundImage = 'url("../resources/logo/red_panda/bamboo/bamboo-sukoi.png")';
      document.body.style.backgroundImage = `url(${img})`;
  }

  render() {
    const showLinks = true;

    const links = (
      <Nav className="ml-auto">
        <LinkContainer to="/test">
          <Nav.Link bsPrefix="link">Start test</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/practice">
          <Nav.Link bsPrefix="link">Practice</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/statistics">
          <Nav.Link bsPrefix="link">Statistics</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/eyetracking">
          <Nav.Link bsPrefix="link">Eye tracking</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/" style={{textDecorationLine: 'underline'}}>
          <Nav.Link bsPrefix="link" onSelect={this.handle_logout}>logout</Nav.Link>
        </LinkContainer>
      </Nav>
    );

    return (
      <React.Fragment>
        <NavbarCustom showLinks={showLinks} links={links} />

        <Jumbotron>
          <Row>
            <Col><Image src={mascot} /></Col>
            <Col>
              <div className="speech-bubble" id="hello_text">
                <h1 className="w3-animate-opacity">こんにちは! <h3 style={{display:'inline'}}>(konnichiwa)</h3></h1>
                <h1>Hello {localStorage.getItem('username')}!</h1>
              </div>
            </Col>
          </Row>
        </Jumbotron>

      </React.Fragment>
    );
  }
}

export default Home;
