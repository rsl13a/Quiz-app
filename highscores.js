// #9 Load and Display High Scores from Local Storage
const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        // 9 Create the <li> to show the name and score of the saved name
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    // 9 Join the array of the players that save their high score
    .join("");