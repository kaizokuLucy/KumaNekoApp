import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../resources/logo/animeCrPanda.png';
import Image from 'react-bootstrap/Image';


class NavbarCustom extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/home">
            <Image src={logo} />
          </Navbar.Brand>
            {this.props.links}
        </Navbar>
      </div >
    );
  }
}
//)

export default NavbarCustom;