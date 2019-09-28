// #3 Display Hard Coded Questions
// 3 Got it from game.html [id="question"]
const question = document.getElementById("question");

// 3 Got it from game.html [class="choice-text"] for the 1 to 4 choices
const choices = Array.from(document.getElementsByClassName("choice-text"));

// 6 Update question out of the max question
const progressText = document.getElementById('progressText');

// 5 Update score
const scoreText = document.getElementById('score');

// 6 Update progress bar. After every question, will fill up a little
const progressBarFull = document.getElementById("progressBarFull");

// 12 Loader
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// 3 Creating questions
let currentQuestion = {};
// 3 Cannot answer before it is done loading the question and answer
let acceptingAnswers = false;
// 3 Score for the game
let score = 0;
// 3 What question you are on
let questionCounter = 0;
// 3 Copy of full questions set and take questions that are available for the user
let availableQuesions = [];

// Questions for each questions
let questions = [];

// 11 Fetch API link from "Open Trivia Database: https://opentdb.com/"
// 10 Fetch questions from API 
fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
    // 10 Get the response 
    .then(res => {
        return res.json();
    })
    // 10 Load the questions from the JSON file and start game
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        // 11 Covert the API question and load into a new form
        questions = loadedQuestions.results.map(loadedQuestion => {
            // 11 Get the original question and format the question we need and return it
            const formattedQuestion = {
                question: loadedQuestion.question
            };
            // 11 Get the answer choice that is incorrect
            const answerChoices = [...loadedQuestion.incorrect_answers];
            // 11 Randomize the 3 incorrect answer and 1 correct answer
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        // 10 Wait to start game until the questions are ready
        startGame();
    })
    // 10 Error will show if typed wrong file
    .catch(err => {
        console.error(err);
    });


//CONSTANTS
// 3 Answer correct get 10 points
const CORRECT_BONUS = 10;
// 3 Maximum questions before the game end
const MAX_QUESTIONS = 10;

// #3 Display Hard Coded Questions
startGame = () => {
    // 3 Start at 0
    questionCounter = 0;
    score = 0;
    // 3 Full copy of all questions, all questions in different array
    // 3 ... is a spread operator. [...questions] Take questions and spread it into an array of questions
    availableQuesions = [...questions];
    getNewQuestion();
    // 12 Game start. Loading is hidden until new question is run, then it will appear
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

// 3 Display Hard Coded Questions
getNewQuestion = () => {
    // 3 After finish all questions, move to the end page
    // 3 If the available questions is 0 / questions is max question
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // 7 Store the score after saving it
        localStorage.setItem('mostRecentScore', score);
        // 3 Go to the end page after reach max question
        return window.location.assign('/end.html');
    }
    // 3 After each question, will move on to the next question
    questionCounter++;
    // 6 Update the question until max question: 1/3 -> 2/3 -> 3/3 -> end game
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
    // 6 Update progress bar and slowly fill up
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // 3 Random question. Everytime use the question, will have other questions and wont repeat
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    // 3 Pulling out questions 
    currentQuestion = availableQuesions[questionIndex];
    // 3 Pulling out questions 
    question.innerText = currentQuestion.question;
    // 
    choices.forEach(choice => {
        // 3 Get the number from [data-number="#"] in game.html
        const number = choice.dataset["number"];
        // 3 Can choose the choice of the question and number <p class="choice-text" data-number="1">
        choice.innerText = currentQuestion["choice" + number];
    });
    // 3 Going to take the available questions array and get rid of the question that is used
    availableQuesions.splice(questionIndex, 1);
    // 3 After loaded, allow user to answer the question
    acceptingAnswers = true;
};

choices.forEach(choice => {
    // 3 Can click the choice
    choice.addEventListener("click", e => {
        // 3 If it is not ready to answer the answer, return
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // 4 Does selected answer = current question answer?
        // 4 If selected answer = answer then "correct" else "incorrect"
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        // 5 If answer is correct, increase score, else dont increase
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        // 4 Selected choice that is correct become green, incorrect become red
        selectedChoice.parentElement.classList.add(classToApply);
        // 4 Set a timeout after clicking and move to the next question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            // 3 After answer question, get new question
            getNewQuestion();
            // 3 1000 = 1 second
        }, 1000);

    });
});

// 5 To update the score if user is correct or incorrect
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

