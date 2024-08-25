///
//
// INDEX PAGE //


// Reveal Clue 1 function
function showClue1() {
    document.getElementById('magnifyingGlass').style.display = 'none';
    document.getElementById('clue1Text').style.display = 'block';
    document.getElementById('hint1Link').style.display = 'block';
}

// Initilaise bootstrap popover elements
let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

//Check if user's final answer is correct. Uses timeout function to get the confetti to appear just before the show Congratulations Modal (passed in)
function checkAnswer() {
    const correctAnswer = "codes";
    const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
    const resultMessage = document.getElementById("resultMessage");

    if (userAnswer === correctAnswer) {
        confettiEffect();
        setTimeout(showCongratulationsModal, 500);
    }
    else {
        resultMessage.textContent = "Not quite, try again";
        resultMessage.classList.add("text-danger");
    }
}

function showCongratulationsModal() {
    const CongratulationsModal = new bootstrap.Modal(document.getElementById('congratulationsModal'));
    CongratulationsModal.show();
}

// 

// Using confetti effect library  
function confettiEffect() {
    confetti({
        particleCount: 1000,
        spread: 300,
        startVelocity: 100,
        origin: {y: 0.6},
        scalar: 1.5
    });
}

// Function to make screen blackout and then pass in the final message function
function triggerBlackout() {
    const blackoutScreen = document.getElementById("blackoutScreen");
    const finalMessage = document.getElementById("finalMessage");

    blackoutScreen.style.visibility = 'visible';
    blackoutScreen.style.opacity = '1';

    setTimeout(showFinalMessage, 2000);
}
// Function to make final message visible and then pass in the Google redirect function
function showFinalMessage() {
    const finalMessage = document.getElementById("finalMessage");
    finalMessage.style.visibility = 'visible';

    setTimeout(redirectToGoogle, 3000);
}

// Function to redirect to Google Homepage
function redirectToGoogle() {
    window.location.href = "https://www.google.com";
}

///
//
// EASTER EGG PAGE

const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
];

// Initialise empty array for user's keystrokes to be logged in
let trackedUserInput = [];

// Event listener to trigger handleKeyDown function when a user presses a key
document.addEventListener('keydown', handleKeyDown);


function handleKeyDown(event) {
    trackedUserInput.push(event.key); // key that user presses is 'pushed' to trackedUserInput array

    // converts konamiCode and trackedUserInput arrays to strings. Uses inbuilt indexOf() function (checks if substring exists within a string) to return the index position of first occurance of
    // substring. So anything at 0 or above triggers the showClue3AnswerModal() function (N.B. if trackedUserInput was not found within konamiCode array then -1 is return and if statement is not
    // triggered) 
    if (trackedUserInput.toString().indexOf(konamiCode.toString()) >= 0) {
        showClue3AnswerModal();
        trackedUserInput = [];
    }

    // if the trackedUserInput array gets longer than the konamiCode array (which could happen if a user is pressing lots of buttons) then the first element in the trackedUserInput array is 
    // 'popped' off to stop the length getting silly
    if (trackedUserInput.length > konamiCode.length) {
        trackedUserInput.shift();
    }
}

// Function to show Clue 3 Answer Modal
function showClue3AnswerModal() {
    const clue3AnswerModal = new bootstrap.Modal(document.getElementById('clue3Modal'));
    clue3AnswerModal.show();
}


///
//
// CAPTAIN'S LOG PAGE

// Initialise tooltips (for hovering over images)
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Hide clue in console.log
if (document.getElementById('captainsLogPage')) {
    console.log("Well, set phasers to stun and beam me up! You found another flag, great work!")
    console.log("FLAG:Spock")
};