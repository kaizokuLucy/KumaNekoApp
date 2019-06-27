import React from 'react';
import './Progress.scss';
import paw from '../../resources/logo/red_panda/capice/correct_capica.png';
import Image from 'react-bootstrap/Image';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    createCircle(color, i) {
        return (
            <Col><div className="frame">
                <div key={i} className="circle" style={{ backgroundColor: color }}></div>
            </div>
            </Col>
        );
    }

    createPaw(i) {
        return (
            <Col>
                <div className="frame">
                    <Image src={paw} key={i} className="progress-image" />
                </div>
            </Col>
        );
    }


    render() {
        var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
            "#85FFC7", "#297373", "#FF8552", "#A40E4C"];
        var renderData = [];
        // create paws
        for (var i = 0; i < 2; i++) {
            renderData.push(this.createPaw(i));
        }
        // create circles
        for (var i = 2; i < 5; i++) {
            var color = colors[i];
            renderData.push(this.createCircle(color, i));
        }
        return (
            <Container>
                <Row>

                    {renderData}

                </Row>
            </Container>
        );
    }

}

export default Progress;

