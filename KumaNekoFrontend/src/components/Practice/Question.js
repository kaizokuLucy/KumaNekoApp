import React from 'react';
import PropTypes from 'prop-types'

import Image from 'react-bootstrap/Image';

import Col from 'react-bootstrap/Col';



class Question extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.letter !== this.props.letter);
  }

  render() {
    switch (this.props.group) {
      case 0:
        return <div style={{ fontSize: "350px", color: "#56C1FF", fontWeight: "900" }}>{this.props.letter}</div>;
      case 1:
        return (
          <Col style={{ height: "500px" }}>
            <div>
              <Image src={this.props.imagePath} className="question-image" />
            </div>
          </Col>
        );
      case 2:
        return (
          <Col style={{ height: "500px" }}>
            <div>
              <Image src={this.props.videoPath} className="question-image" />
            </div>
          </Col>
        );
      case 3:
        return (
          <Col style={{ height: "500px"}}>
            <div style={{ fontSize: "350px", color: "#56C1FF", fontWeight: "900" }}>{this.props.letter}</div>
          </Col>
        );
      default:
        return <div style={{ fontSize: "350px", color: "#56C1FF", fontWeight: "900" }}>Something went wrong</div>
    }
  }

}


Question.propTypes = {
  letter: PropTypes.string.isRequired
};


export default Question;