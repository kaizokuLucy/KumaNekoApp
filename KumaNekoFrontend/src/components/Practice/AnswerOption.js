import React from 'react';

import Button from 'react-bootstrap/Button';

import './Practice.scss';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';



class AnswerOption extends React.Component {
    handleChange = (event) => {
        this.props.onAnswerSelected(event);
    }
    render() {
        var buttonStyle = {
            fontSize: "100px",
            //backgroundColor: "red",
            //height: "100px"
            width: "100%",
            //display: "inline-block",
        };

        return (
            <div>
                <ButtonToolbar>
                    <Button
                        style={buttonStyle}
                        size="lg"
                        id={this.props.id}
                        value={this.props.answerContent}
                        checked={this.props.answerContent === this.props.answer}
                        onClick={this.handleChange}
                        disabled={this.props.disabled}
                    >
                        {this.props.answerContent}
                    </Button >
                </ButtonToolbar>
                {/*<input
                    type="radio"
                    className="radioCustomButton"
                    name="radioGroup"
                    checked={this.props.answerContent === this.props.answer}
                    id={this.props.id}
                    value={this.props.answerContent}
                    //  onChange={props.onAnswerSelected}
                    onChange={this.handleChange}
                    disabled={this.state.disabled}
                />
                <label className="radioCustomLabel" htmlFor={this.props.answerType}>
                    {this.props.answerContent}
                </label>
                */}
            </div>
        );
    }
}

/*AnswerOption.propTypes = {
    answerContent: PropTypes.string.isRequired,
};*/

export default AnswerOption;
