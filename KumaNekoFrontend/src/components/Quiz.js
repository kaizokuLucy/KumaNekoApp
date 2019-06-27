import React from 'react';
import './Quiz.scss';
import NavbarCustom from './NavbarCustom';
import testQuestions from './testQuestions';
import AnswerOption from './Practice/AnswerOption';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Link from 'react-router-dom/Link';

var timeStampStart;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    timeStampStart = Math.floor(Date.now() / 1000);
    this.state = {
      value: '',
      userAnswers: {},
      finished: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // css body
  componentDidMount() {
      //document.body.style.backgroundColor = '#CCCCCC';
      //document.body.style.backgroundImage = 'none';
  }

  generateQuestion(data) {
    return (
      <fieldset id="1">

        {/*<Question content={data.question} />*/}
        {data.answers.map(a => <AnswerOption answerContent={a} />)}
      </fieldset>
    );
  }

  handleTestData = (data) => {
    fetch('http://localhost:8000/store_test_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 200) {
          console.log("test je dobar");
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .catch(error => console.log("ERROR: " + error));
  };


  handleSubmit(event) {
    console.log("HELOOOOOOOOOOOOO");
    //  console.log(JSON.stringify(event.currentTarget));
    let correct = 0;
    testQuestions.forEach((q, i) => {
      if (this.state[q.name] === q.correctAnswer) {
        correct++;
      }
    });
    const r = window.confirm("Are you sure you really want to finish the test?");
    if (r === true) {
      console.log("You have " + correct + " correct answers");
      this.setState({
        value: correct,
      });

      var timeStampEnd = Math.floor(Date.now() / 1000);
      var time = timeStampEnd - timeStampStart;
      var data = { "username": localStorage.username, "duration": time, "correct_answers": correct, "userAnswers": this.state.userAnswers };

      console.log(JSON.stringify(data));
      this.handleTestData(data);
      this.setState({
        finished: true,
      });
    }
    //alert('Answers: ' + correct);
    event.preventDefault();
  }

  handleChange(event, symbol) {
    console.log(event.target.defaultValue);
    // console.log(JSON.stringify(event.target));
    console.log(JSON.stringify(event.target.type));
    console.log("symbol: " + symbol);

    console.log("question: " + event.target.asdf);
    //this.setState({ value: event.target.defaultValue });
    /* this.setState(state => {
       const list = state.list.push(state.value);    
     });*/

    console.log(event.target.name);
    const name = event.target.name;
    const val = event.target.defaultValue;
    this.setState((prevState) => ({
      [name]: val,
      userAnswers: { ...prevState.userAnswers, [symbol]: val },
    }));
    //this.setState({list[0]: event.target.defaultValue});
  }

  renderTest() {
    const questions = testQuestions.map((q, i) => {
      return (
        // key={i} u div i label je da se makne warrning koji javlja chrome
        <div key={i} id={q.key} className="question-container">
          <h1>
            {/*<em>Q{i + 1}</em>:*/}
            <div style={{ fontSize: "200px", fontWeight: "900" }}>{q.symbol}</div>
          </h1>
          {q.answers.map((a, i) =>
            <label key={i} style={{ fontSize: "40px" }}>
              <input name={q.name} type="radio" defaultValue={a} onChange={(event) => this.handleChange(event, q.symbol)} style={{ width: "30px", height: "30px" }} /> {a}
            </label>)}
        </div>
      );
    });

    return (
      <div>
        <NavbarCustom />

        <Jumbotron>
          <div>
            {/* gore desno dolje lijevo*/}
            <h1 style={{ margin: "3px 0px 10px 50px" }}>Quiz</h1>
            <p style={{ fontSize: "30px", margin: "3px 0px 3px 50px" }}>
              In this test you will get the same symbols that you saw on the practice part. Try to remember the right answer and when you think you are finished, press the submit button. Good luck! がんばって!
            </p>
            <Form onSubmit={this.handleSubmit}>
              {questions}
              <Button as="input" variant="primary" type="submit" value="Finish" className="finish-button" />
              <p>
                Before you hit the <strong>finish button</strong> check if you answerd all the questions, there are no minues points.
              </p>
            </Form>
          </div>
        </Jumbotron>

      </div>

    );
  }

  renderResult() {
    const questions = testQuestions.map((q, i) => {
      var color = (q.correctAnswer === this.state.userAnswers[q.symbol] ? "green" : "red");
      return (
        // key={i} u div i label je da se makne warrning koji javlja chrome
        <div key={i} id={q.key} className="question-container">
          <h1>
            {/*<em>Q{i + 1}</em>:*/}
            <div style={{ fontSize: "200px", fontWeight: "900", backgroundColor: color }}>{q.symbol}</div>
          </h1>
          {q.answers.map((a, i) => {
            var aCol;
            var disabled = true;
            var answered = this.state.userAnswers[q.symbol];
            var checked = false;
            if (a === q.correctAnswer) {
              aCol = "green";
            } else if (a === answered && a !== q.correctAnswer) {
              aCol = "red";
            }
            if (a === answered) {
              checked = true;
            }
            return (
              <label key={i} style={{ fontSize: "40px", color: aCol }}>
                <input
                  name={q.name}
                  type="radio"
                  defaultValue={a}
                  disabled={disabled}
                  checked={checked}
                  style={{ width: "30px", height: "30px" }}
                />
                {a}
              </label>
            );
          })
          }
        </div>
      );
    });

    return (
      <div>
        <NavbarCustom />

        <Jumbotron>
          <div>
            <Form>
              {questions}
              <div style={{fontSize: "30px"}}>Number of correct answers:  {this.state.value}</div>
              <Link to='/home'>
                <Button as="input" variant="primary" type="submit" value="Home" className="finish-button" />
              </Link>
            </Form>
          </div>
        </Jumbotron>

      </div>

    );
  }


  render() {
    return this.state.finished ? this.renderResult() : this.renderTest();
  }
}

export default Quiz;
