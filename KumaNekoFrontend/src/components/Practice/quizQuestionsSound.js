import ta from '../../resources/practice_data/audio/ta.mp3';
import ro from '../../resources/practice_data/audio/ro.mp3';
import mo from '../../resources/practice_data/audio/mo.mp3';
import ha from '../../resources/practice_data/audio/ha.mp3';

var quizQuestionsSound = [
    // のときあひりくむゆたろもはへてふぬ    
    {
        id: "0",
        name: "q0",
        symbol: "た",
        answers: ["ta", "he", "sa"],
        correctAnswer: "ta",
        audioPath: ta,
    },
    {
        id: "1",
        name: "q1",
        symbol: "ろ",
        answers: ["sa", "ro", "he"],
        correctAnswer: "ro",
        audioPath: ro,
    },    
    {
        id: "2",
        name: "q2",
        symbol: "も",
        answers: ["sa", "mo", "he"],
        correctAnswer: "mo",
        audioPath: mo,
    },
    {
        id: "3",
        name: "q3",
        symbol: "は",
        answers: ["sa", "no", "ha"],
        correctAnswer: "ha",
        audioPath: ha,
    },
]

export default quizQuestionsSound;