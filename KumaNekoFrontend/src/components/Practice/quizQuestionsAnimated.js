import yu from '../../resources/practice_data/videos/yu.gif';
import mu from '../../resources/practice_data/videos/mu.gif';
import ku from '../../resources/practice_data/videos/ku.gif';
import hi from '../../resources/practice_data/videos/hi.gif';

var quizQuestionsAnimated = [
    // のときあひりくむゆたろもはへてふぬ
    {
        id: "0",
        name: "q0",
        symbol: "ゆ",
        answers: ["sa", "no", "yu"],
        correctAnswer: "yu",
        videoPath: yu,
    },
    {
        id: "1",
        name: "q1",
        symbol: "む",
        answers: ["sa", "no", "mu"],
        correctAnswer: "mu",
        videoPath: mu,
    },
    {
        id: "2",
        name: "q2",
        symbol: "く",
        answers: ["sa", "ku", "he"],
        correctAnswer: "ku",
        videoPath: ku,
    },
    {
        id: "3",
        name: "q3",
        symbol: "ひ",
        answers: ["he", "i", "hi"],
        correctAnswer: "hi",
        videoPath: hi,
    },
]

export default quizQuestionsAnimated;