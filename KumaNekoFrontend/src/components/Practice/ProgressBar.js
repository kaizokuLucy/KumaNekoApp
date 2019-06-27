import React from 'react';
import './ProgressBar.scss';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

class ProgressBar extends React.Component {
  render() {
    var speed = "0";
    if(this.props.animate) {
      speed = "0.4";
    }
    return (
      <Container>
        <Row>
          <Col xs={2}></Col>
          <Col>
            <div className="progress_bar">
              <div className="pro-bar"
                style={{ 
                  width: String(this.props.percentage) + '%', 
                  background: 'linear-gradient(to right,  #cf5d81 35%,#5c8ab7 68%)', 
                  transition: "width " + speed + "s ease-in" 
                }}
              >
                {/* <span>{String(this.props.percentage) + '%'}</span>*/}
              </div>
            </div>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    );
  }

}

export default ProgressBar;