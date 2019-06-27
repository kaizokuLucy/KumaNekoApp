import React from 'react';
import Quiz from './Quiz';

// import ProgressBar from './ProgressBar';

//import './Practice.scss';

import Link from 'react-router-dom/Link';
import Button from 'react-bootstrap/Button';

import ProgressBar from './ProgressBar';

import quizQuestions from './quizQuestions';
import quizQuestionsSound from './quizQuestionsSound';
import quizQuestionsPicture from './quizQuestionsPicture';
import quizQuestionsAnimated from './quizQuestionsAnimated';


const THRESHOLD = 8;

const questionGroups = [quizQuestions, quizQuestionsPicture, quizQuestionsAnimated, quizQuestionsSound];

var groupId = 0;

var timeStampStart;

class Practice extends React.Component {
  constructor(props) {
    super(props);

    // take all the questions from a group
    var data = questionGroups[groupId];

    var questionList = Array.apply(null, { length: data.length }).map(Number.call, Number);
    var question = data[this.takeRandom(questionList)];

    timeStampStart = Math.floor(Date.now() / 1000);
  

    // const shuffledAnswerOptions = this.shuffleArray(question.answers);

    this.state = {
      questionList: questionList,
      question: question,
      answerOptions: [question.correctAnswer],
      answer: '',
      answerType: '',
      correct: 0,
      result: false,
      correctAnswer: question.correctAnswer,
      progressCounter: new Array(quizQuestions.length).fill(0),
      animate: false,
      disabledStates: [false, false, false],
      userAnswers: {},
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  // css body
  componentDidMount() {
    console.log("mount");
    document.body.style.backgroundColor = '#D1E294';
    document.body.style.backgroundImage = 'none';
  }

  takeRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  };

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {

    var answer = event.currentTarget.value;

    console.log("answer " + JSON.stringify(this.state.question));
    // MARKED ANSWER IS CORRECT
    if (answer === this.state.correctAnswer) {
      var newProgressCounter = this.state.progressCounter;
      newProgressCounter[this.state.question.id] += 1;
      this.setState((state) => ({
        progressCounter: newProgressCounter,
        answer: answer,
        animate: true
      }));

      // izbaci sve koji su odgovoreni n puta
      var newQuestionList = this.state.questionList.filter(x => this.state.progressCounter[x] < THRESHOLD);

      console.log("new list: " + newQuestionList);
      // ARE THERE ANY MORE questions IN THE group
      if (newQuestionList.length > 0) {
        this.setState({
          questionList: newQuestionList,
        });
        setTimeout(() => this.setNextQuestion(), 1000);
      }
      // NO MORE questions IN group
      else {
        groupId++;
        console.log("group id: " + groupId);
        console.log("NOVA GRUPA: " + JSON.stringify(questionGroups[groupId]));
        // END if no more group
        if (groupId == questionGroups.length) {
          groupId = 0;
          setTimeout(() => this.setResults(["buok"]), 1000);
        }
        // TAKE NEW GROUP 
        else {

          setTimeout(() => {
            var data = questionGroups[groupId];
            console.log("DATA: " + JSON.stringify(data));

            // reset index
            newQuestionList = Array.apply(null, { length: data.length }).map(Number.call, Number);

            //new question from new group
            var newQuestion = data[this.takeRandom(newQuestionList)];
            console.log(newQuestion);
            this.setState({
              questionList: newQuestionList,
              //question: newQuestion,
              //answerOptions: this.shuffleArray(newQuestion.answers),
              progressCounter: new Array(newQuestionList.length).fill(0),
            });
            this.setNextQuestion()
          }, 1000);
        }
      }
    }
    // WRONG ANSWER, SET NEGATIVE POINTS
    else {
      // disableButton(event.currentTarget.);
      var newDisabledStates = this.state.disabledStates;
      newDisabledStates[event.currentTarget.id] = true;
      console.log("New disabled states: " + JSON.stringify(newDisabledStates));
      this.setState((prevState) => ({
        //  answer: answer,
        userAnswers: { ...prevState.userAnswers, 
          [this.state.question.symbol]: (prevState.userAnswers[this.state.question.symbol] || 0) + 1 },
          disabledStates: newDisabledStates,
      }));
      console.log("userAnswers: " + JSON.stringify(this.state.userAnswers));
      if (this.state.progressCounter[this.state.question.id] > 0) {

        var a_newProgressCounter = this.state.progressCounter;
        a_newProgressCounter[this.state.question.id] -= 0.5;


        this.setState((state) => ({
          progressCounter: a_newProgressCounter,
          //  answer: answer,
          animate: true,
          disabledStates: newDisabledStates,
        }));
      }
    }
  }


  setNextQuestion() {
    var question = [];
    if (this.state.questionList.length > 1) {
      const tmpList = this.state.questionList.filter(x => x !== Number(this.state.question.id));
      question = questionGroups[groupId][this.takeRandom(tmpList)];
    } else {
      question = questionGroups[groupId][this.takeRandom(this.state.questionList)];
    }
    let shuffledAnswerOptions = [];
    if (this.state.progressCounter[question.id]) {
      shuffledAnswerOptions = this.shuffleArray(question.answers);
    } else {
      shuffledAnswerOptions = [question.correctAnswer];
    }

    this.setState({
      question: question,
      answerOptions: shuffledAnswerOptions,
      answer: '',
      correctAnswer: question.correctAnswer,
      animate: false,
      disabledStates: [false, false, false]
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(a) {
    console.log(JSON.stringify(a));

    if (a.length === 1) {
      this.setState({ result: "be" });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    const percentage = (this.state.progressCounter[this.state.question.id] / THRESHOLD) * 100;
    //const progress = this.state.progressCounter[this.state.question.id];
    return (
      <div>
        <ProgressBar percentage={Math.max(0, Math.min(100, percentage))} animate={this.state.animate} />

        {/* <Progress progress={progress} /> */}

        <Quiz
          // TODO TODO TODO TODO skuzi kaj je answer
          answer={this.state.answer}
          //answerType={this.state.answerType}
          answerOptions={this.state.answerOptions}
          //questionId={this.state.questionId}
          question={this.state.question.symbol}
          //questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
          correctAnswer={this.state.correctAnswer}
          disabledStates={this.state.disabledStates}
          group={groupId}
          imagePath={this.state.question.imagePath}
          videoPath={this.state.question.videoPath}
          audioPath={this.state.question.audioPath}
        />
      </div>
    );
  }

  handlePracticeData = (data) => {
    fetch('http://localhost:8000/store_practice_data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .catch(error => console.log("ERROR: " + error));
  };


  renderResult() {
    var timeStampEnd = Math.floor(Date.now() / 1000);
    var time = timeStampEnd - timeStampStart;
    var data = { "username": localStorage.username, "duration": time, "userAnswers": this.state.userAnswers };

    this.handlePracticeData(data);
    return (
      <div style={{margin: "10px"}}>
        <h1>Bravoooooo</h1>
        <Link to='/home'>
          <Button as="input" variant="primary" type="submit" value="Home" className="finish-button" />
        </Link></div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}


export default Practice;
