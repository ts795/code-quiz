// Get elements
var startButtonEl = document.getElementById("start-quiz");
var startEl = document.getElementById("start");
var timeLeftEl = document.getElementById("time-left");
var secondsLeft = 60;

// Click event handler for the start button
startButtonEl.addEventListener("click", function(event) {
    // Hide the start div and show the question div
    startEl.style.display = "none";

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