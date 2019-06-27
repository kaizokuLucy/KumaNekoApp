import React from 'react';
import  CSSTransitionGroup  from 'react-transition-group/CSSTransition';


class Result extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
        className="container result"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div>
          You prefer <strong>yesss</strong>!
      </div>
      </CSSTransitionGroup>
    );
    //You prefer <strong>{props.quizResult}</strong>!

  }
}

/*Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};*/

export default Result;
