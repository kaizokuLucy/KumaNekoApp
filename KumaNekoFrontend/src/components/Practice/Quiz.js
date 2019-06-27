import React from 'react';
import AnswerOption from './AnswerOption';

import Question from './Question';

import SoundPlayer from './SoundPlayer';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import './Practice.scss';


class Quiz extends React.Component {
    renderAnswerOptions = (a, i) => {
        return (
            <Col style={{ textAlign: "center", }}>
                <AnswerOption
                    key={Math.random()}
                    id={i}
                    answerContent={a}
                    // answerType={key.type}
                    answer={this.props.answer}
                    //questionId={props.questionId}
                    onAnswerSelected={this.props.onAnswerSelected}
                    correctAnswer={this.props.correctAnswer}
                    disabled={this.props.disabledStates[i]}
                />
            </Col>
        );
    }

    render() {
        return (
            <div>
                <div key={this.props.questionId} className="pitanjce">
                    <Container>
                        <Row bsPrefix style={{ textAlign: "center", }}>
                            {/*zIndex kako bi se element dignuo iznad, inace ne bi radio onCLick*/}
                            <div style={{ zIndex: "1000", position: "absolute", padding: "50px"}}>
                                {this.props.group === 3 ? <SoundPlayer audioPath={this.props.audioPath} /> : ''}
                            </div>
                            <Col>
                                <Question
                                    letter={this.props.question}
                                    group={this.props.group}
                                    imagePath={this.props.imagePath}
                                    videoPath={this.props.videoPath}
                                    audioPath={this.props.audioPath}
                                />
                            </Col>
                        </Row>
                        <Row>
                            {this.props.answerOptions.map(this.renderAnswerOptions)}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

/*Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};*/

export default Quiz;