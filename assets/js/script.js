// Get elements
var startButtonEl = document.getElementById("start-quiz");
var startEl = document.getElementById("start");
var timeLeftEl = document.getElementById("time-left");
var quizQuestionEl = document.getElementById("quiz-question");
var answerChoicesEl = document.getElementById("answer-choices");
var answerFeedbackEl = document.getElementById("answer-feedback");
var answerFeedbackTextEl = document.getElementById("answer-feedback-text");
var enterInitialsEl = document.getElementById("enter-initials");
var questionEl = document.getElementById("question");
var finalScoreMessageEl = document.getElementById("final-score-message");
var userInitialsEl = document.getElementById("user-initials");
var submitEl = document.getElementById("submit");
var viewScoresEl = document.getElementById("view-scores");
var highScoresEl = document.getElementById("high-scores");
var viewHighScoresEl = document.getElementById("view-highscores");
var goBackButtonEl = document.getElementById("go-back");
var clearHighScoresButtonEl = document.getElementById("clear-high-scores");

var secondsLeft = 60;
var questionIndex = 0;
// the user's score
var score = 0;
// Array to hold the high scores
var highScores = [];

// Array containing questions for the quiz
var questions = [
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["quotes", "curly brackets", "parantheses", "square brackets"],
        correctAnswerIndex: 2
    },
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswerIndex: 2
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswerIndex: 3
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswerIndex: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal/bash", "for loops", "console log"],
        correctAnswerIndex: 3
    }
];

// Sort the high scores so the larger scores are at lower indexes
function sortHighScores() {
    // Return number greater than 0 if the second element is larger than the first element so it is before it in the array
    highScores.sort((firstEl, secondEl) => { return secondEl.score - firstEl.score} );
}

// Get the high scores from local storage
function init() {
    var localStorageValues = localStorage.getItem("highScores");
    if (localStorageValues) {
        highScores = JSON.parse(localStorageValues);
    } else {
        highScores = [];
    }
}

// Display a quiz question to the user
function displayNextQuestion() {
    // Hide the answer feedback
    answerFeedbackEl.style.display = "none";

    // Remove any answers for the previous question
    while (answerChoicesEl.firstChild) {
        answerChoicesEl.removeChild(answerChoicesEl.firstChild);
    }

    question = questions[questionIndex];
    // Display the question
    quizQuestionEl.textContent = question.question;

    // Create divs for the answers and append them to the parent div
    for (var choiceIdx = 0; choiceIdx < question.answers.length; choiceIdx++) {
        var choiceToAppend = document.createElement("div");
        // Display the choice with a number prefixed to it
        choiceToAppend.textContent = (choiceIdx + 1) + ". " + question.answers[choiceIdx];
        var isCorrectAnswer = (choiceIdx === question.correctAnswerIndex);
        // Set a data attribute which indicates if the choice is the correct answer
        choiceToAppend.setAttribute("data-is-correct-answer", isCorrectAnswer);
        // Set the class for the answer
        choiceToAppend.setAttribute("class", "answer-choice");
        answerChoicesEl.appendChild(choiceToAppend);
    }
}

// Display the final score to the user
function displayFinalScore() {
    // Hide the answer feedback
    answerFeedbackEl.style.display = "none";
    // Hide the question
    questionEl.style.display = "none";

    // Show the final score
    finalScoreMessageEl.textContent = "Your final score is " + score

    // Display the final score
    enterInitialsEl.style.display = "block";

}

// Display the high scores
function displayHighScores() {
    // Hide the enter initials and start divs
    enterInitialsEl.style.display = "none";
    startEl.style.display = "none";
    // Sort the high scores from highest to lowest
    sortHighScores();

    // Remove any previously displayed high scores
    while (highScoresEl.firstChild) {
        highScoresEl.removeChild(highScoresEl.firstChild);
    }

    for (var idx = 0; idx < highScores.length; idx++) {
        var highScoreEntry = document.createElement("div");
        highScoreEntry.textContent = (idx + 1) + ". " +  highScores[idx].initials + " - " + highScores[idx].score;
        // Set the class for the entries
        highScoreEntry.setAttribute("class", "high-score-entry");
        // Alternate the row colors        
        if (idx % 2 === 0) {
            highScoreEntry.style.backgroundColor = "mediumPurple";
        } else {
            highScoreEntry.style.backgroundColor = "plum";
        }
        highScoresEl.appendChild(highScoreEntry);
    }

    viewScoresEl.style.display = "block";
}

// Click event handler for the start button
startButtonEl.addEventListener("click", function(event) {
    // Hide the start div and show the question div
    startEl.style.display = "none";
    question.style.display = "block";

    // reset the score
    score = 0;

    // Set the question index
    questionIndex = 0;
    // Show the question
    displayNextQuestion();

    // Start the quiz timer
    secondsLeft = 60;
    timeLeftEl.textContent = "Time: " + secondsLeft;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        // Update the time
        timeLeftEl.textContent = "Time: " + secondsLeft;
    
        if(secondsLeft <= 0 || questionIndex >= questions.length) {
            // Clear the timer since time has run out or there are no more questions
            clearInterval(timerInterval);
            // Show the final score
            displayFinalScore();
        }
      }, 1000);
});

/* Add a listener for when a choice is clicked */
answerChoicesEl.addEventListener("click", function(event) {
    var element = event.target;

    // Check if it is an answer choice
    if (element.getAttribute("data-is-correct-answer")) {
        if (element.getAttribute("data-is-correct-answer") === "true") {
            // The user got the question correct. Increase the score
            score += 10;
        } else {
            // The user got the question wrong so deduct a time penalty
            secondsLeft -= 10;
        }

        // Display whether the answer was correct or not
        var textToDisplay = element.getAttribute("data-is-correct-answer") === "true" ? "Correct!" : "Wrong!";
        answerFeedbackTextEl.textContent = textToDisplay;
        // Show the feedback
        answerFeedbackEl.style.display = "block";

        questionIndex++;

        if (questionIndex < questions.length && secondsLeft > 0) {
            // There are more questions and there is still time left
            // Display the next question after 250ms so the user can see the feedback 
            setTimeout(displayNextQuestion, 250);
        }
    }
});

// Handle the user initials form submission
function submitForm(event) {
    // Prevent default action
    event.preventDefault();
    
    // Get the user initials and trim any white spaces
    var userInitials = userInitialsEl.value.trim();
    
    if(userInitials){
        // Store the score and initials in local storage
        highScores.push({"initials": userInitials, "score": score});
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    } else {
        alert("Please enter initials");
    }
  }
  
  // Add listener to submit element
  submitEl.addEventListener("click", submitForm);

  // Add a click listener for the view high scores button
  viewHighScoresEl.addEventListener("click", displayHighScores);

  // Add a click listener for the clear high scores button
  clearHighScoresButtonEl.addEventListener("click", function() {
      highScores = [];
      // Clear the high scores from persistent storage
      localStorage.removeItem('highScores');
      // Update the high scores
      displayHighScores();
  });

  // Get the values from local storage
  init();