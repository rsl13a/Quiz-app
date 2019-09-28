// #7 Create and Style the End Page 
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
// 7 Get the most recent score from the storage
const mostRecentScore = localStorage.getItem("mostRecentScore");

// 8 Getting the high scores from the local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// 8 The best 5 score
const MAX_HIGH_SCORES = 5;

// 7 The score of the recent ones
finalScore.innerText = mostRecentScore;

// 7 Characters will appear when typed
username.addEventListener("keyup", () => {
    // 7 The saved button will be disable if there are no username typed
    saveScoreBtn.disabled = !username.value;
});

// 7 Can click save for the high score
saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    // 8 Math for the score that is being saved
    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    // 8 The best of 5 score will be in the list of high score
    highScores.push(score);
    // 8 If B score is higher than A score, but B before A
    // 8 In another way, top 5 high score is only shown, after 5 score it wont show anything else
    highScores.sort((a, b) => b.score - a.score);
    // 8 After 5 score is on the board, dont show anything else
    highScores.splice(5);
    // 8 Update the high score and will be saved as a string
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // 8 After saved, go to the home page (/)
    window.location.assign("/");
};