// Function to handle form validation on the Match Details page
document.getElementById('match-form')?.addEventListener('input', function() {
    // Get all input fields
    const team1 = document.getElementById('team1').value.trim();
    const team2 = document.getElementById('team2').value.trim();
    const overs = document.getElementById('overs').value.trim();
    const wickets = document.getElementById('wickets').value.trim();
    const matchTime = document.getElementById('match-time').value.trim();

    // Check if all fields are filled
    if (team1 && team2 && overs && wickets && matchTime) {
        document.getElementById('play-match-btn').disabled = false;
    } else {
        document.getElementById('play-match-btn').disabled = true;
    }
});

// Variables to track score, wickets, overs, balls, and extras
let score = 0;
let wickets = 0;
let balls = 0;
let overs = 0;
let extras = 0;

// Function to add runs to the score
function addRuns(runs) {
    score += runs;
    incrementBall();
    updateScore();
}

// Function to record a wide ball
function recordWide() {
    extras++;
    updateScore();
}

// Function to record a no-ball
function recordNoBall() {
    extras++;
    updateScore();
}

// Function to record an out (wicket)
function recordOut() {
    wickets++;
    incrementBall();
    updateScore();
}

// Function to handle ball increments and overs calculation
function incrementBall() {
    balls++;
    if (balls === 6) {
        overs++;
        balls = 0;
    }
}

// Function to undo the last action (basic undo functionality)
function undo() {
    // For simplicity, we will just subtract the last action's effect
    if (score > 0) score--;
    updateScore();
}

// Function to update the score display
function updateScore() {
    document.getElementById('score').textContent = `${score}-${wickets}`;
    document.querySelector('.score-display p').textContent = `Extras - ${extras} | Overs - ${overs}.${balls} | CRR - ${calculateCRR()}`;
}

// Function to calculate the current run rate (CRR)
function calculateCRR() {
    let totalBalls = overs * 6 + balls;
    if (totalBalls === 0) return 0;
    return (score / totalBalls * 6).toFixed(2);
}

// Function to select batsman (placeholder)
function selectBatsman() {
    alert("Select Batsman logic to be implemented");
}

// Function to select bowler (placeholder)
function selectBowler() {
    alert("Select Bowler logic to be implemented");
}
