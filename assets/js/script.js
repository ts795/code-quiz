// Get elements
var startButtonEl = document.getElementById("start-quiz");
var startEl = document.getElementById("start");
var timeLeftEl = document.getElementById("time-left");
var quizQuestionEl = document.getElementById("quiz-question");
var answerChoicesEl = document.getElementById("answer-choices");
var answerFeedbackEl = document.getElementById("answer-feedback");

var secondsLeft = 60;
var questionIndex = 0;

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

// Display a quiz question to the user
function displayNextQuestion() {
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


// Click event handler for the start button
startButtonEl.addEventListener("click", function(event) {
    // Hide the start div and show the question div
    startEl.style.display = "none";
    question.style.display = "block";

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
    
        if(secondsLeft === 0) {
            // Clear the timer since time has run out
            clearInterval(timerInterval);
        }
      }, 1000);
});