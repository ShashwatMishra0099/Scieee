// Variables to hold match and team data
let score = 0;
let wickets = 0;
let balls = 0;
let overs = 0;
let currentBowler = "";
let currentStriker = "";
let currentNonStriker = "";
let bowlerStats = { overs: 0, runsConceded: 0, wickets: 0 };

// Event listeners for loading data from match details
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the scoring page
    if (window.location.href.includes('scoring.html')) {
        loadMatchDetails();
        updateScore();
    }
});

function startMatch() {
    window.location.href = "match-details.html";
}

function viewPreviousMatches() {
    alert("Feature coming soon!");
}

// Function to load match details (team names, players) from local storage or form inputs
function loadMatchDetails() {
    // Fetch match details from localStorage if saved, or set default
    currentStriker = localStorage.getItem('striker') || "Striker";
    currentNonStriker = localStorage.getItem('non-striker') || "Non-Striker";
    currentBowler = localStorage.getItem('bowler') || "Bowler";

    document.getElementById('striker-name').innerText = currentStriker;
    document.getElementById('non-striker-name').innerText = currentNonStriker;
    document.getElementById('bowler-name').innerText = currentBowler;
}

function addRun(runs) {
    score += runs;
    balls++;
    bowlerStats.runsConceded += runs;
    updateScore();
}

function addExtra(extra) {
    alert(extra + " added!");
    score++;
    updateScore();
}

function addWicket() {
    wickets++;
    balls++;
    bowlerStats.wickets++;
    let dismissalMethod = prompt("Enter method of dismissal (Caught, Bowled, LBW, etc.):", "Caught");
    alert("Wicket fallen! Method: " + dismissalMethod);
    updateScore();
    // Optionally, change striker after a wicket
    changeStriker();
}

function changeStriker() {
    let temp = currentStriker;
    currentStriker = currentNonStriker;
    currentNonStriker = temp;
    document.getElementById('striker-name').innerText = currentStriker;
    document.getElementById('non-striker-name').innerText = currentNonStriker;
}

function bowlingChange() {
    let newBowler = prompt("Enter the name of the new bowler:", "New Bowler");
    currentBowler = newBowler;
    bowlerStats.overs++;
    bowlerStats.runsConceded = 0;
    bowlerStats.wickets = 0;
    document.getElementById('bowler-name').innerText = currentBowler;
}

function updateScore() {
    document.getElementById('score').innerText = score + '/' + wickets;
    document.getElementById('overs').innerText = (Math.floor(balls / 6)) + '.' + (balls % 6) + ' overs';
    document.getElementById('run-rate').innerText = 'Run Rate: ' + (score / (balls / 6)).toFixed(2);
    document.getElementById('bowler-stats').innerText = bowlerStats.overs + ' overs, ' + bowlerStats.runsConceded + ' runs, ' + bowlerStats.wickets + ' wickets';
}

// Function to slide the scorecard in and out
function toggleScorecard() {
    const scorecard = document.getElementById('scorecard');
    scorecard.classList.toggle('active');
}

// Function to save match progress (can be extended to save all data)
function saveMatchProgress() {
    localStorage.setItem('score', score);
    localStorage.setItem('wickets', wickets);
    localStorage.setItem('balls', balls);
    localStorage.setItem('striker', currentStriker);
    localStorage.setItem('non-striker', currentNonStriker);
    localStorage.setItem('bowler', currentBowler);
    alert("Match progress saved!");
}

function resumeMatch() {
    // Load saved match data
    score = parseInt(localStorage.getItem('score')) || 0;
    wickets = parseInt(localStorage.getItem('wickets')) || 0;
    balls = parseInt(localStorage.getItem('balls')) || 0;
    currentStriker = localStorage.getItem('striker') || "Striker";
    currentNonStriker = localStorage.getItem('non-striker') || "Non-Striker";
    currentBowler = localStorage.getItem('bowler') || "Bowler";
    
    updateScore();
}
