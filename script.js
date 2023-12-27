let currentQuestion = 1;
let timer;
const timeLimit = 10; // Set the time limit for each question in seconds

// Function to start the timer
function startTimer() {
    let timeRemaining = timeLimit;
    timer = setInterval(function () {
        const timerContainer = document.getElementById('timer-container');
        if (timerContainer) {
            timerContainer.textContent = `Time: ${timeRemaining}s`;
            timeRemaining--;

            if (timeRemaining < 0) {
                // Time is up, move to the next question
                clearInterval(timer);
                nextQuestion();
            }
        }
    }, 1000);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer);
    const timerContainer = document.getElementById('timer-container');
    if (timerContainer) {
        timerContainer.textContent = '';
    }
}

function nextQuestion() {
    resetTimer();

    const selectedAnswer = getSelectedAnswer(`q${currentQuestion}`);
    if (selectedAnswer) {
        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);
        displayMessage(`Question ${currentQuestion} Answered: ${selectedAnswer}`, isCorrect);
        document.getElementById(`question${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        const nextQuestionElement = document.getElementById(`question${currentQuestion}`);
        if (nextQuestionElement) {
            nextQuestionElement.style.display = 'block';
            startTimer(); // Start the timer for the next question
        } else {
            document.getElementById('submitBtn').style.display = 'block';
        }
    } else {
        alert('Please select an answer before moving to the next question.');
    }
}
startTimer();
const timerContainer = document.getElementById('timer-container');
if (timerContainer) {
    timerContainer.textContent = `Time: ${timeLimit}s`;
}



function checkAnswer(questionNumber, selectedAnswer) {
    const correctAnswers = {
        q1: 'a', // Replace with the correct answer for question 1
        q2: 'b', // Replace with the correct answer for question 2
        q3: 'a',
        q4: 'a',
        q5: 'b',
        q6: 'a',
        q7: 'b',
        q8: 'a',
        q9: 'c',
        q10: 'a',
    };
    return correctAnswers[`q${questionNumber}`] === selectedAnswer;
}

function getSelectedAnswer(questionName) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    return selectedOption ? selectedOption.value : null;
}

function displayMessage(message, isCorrect) {
    const messageElement = document.getElementById('message');
    const symbol = isCorrect ? '✔️' : '❌';
    messageElement.innerHTML = `${message} ${symbol}`;
}

function submitQuiz() {
    alert('Quiz submitted!');
}
function submitQuiz() {
    clearInterval(timer); // Stop the timer
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('final-page').style.display = 'block';

    const overallScore = calculateOverallScore();
    displayOverallScore(overallScore);
}

function calculateOverallScore() {
    let correctAnswersCount = 0;

    for (let i = 1; i <= 10; i++) {
        const selectedAnswer = getSelectedAnswer(`q${i}`);
        if (selectedAnswer && checkAnswer(i, selectedAnswer)) {
            correctAnswersCount++;
        }
    }

    return correctAnswersCount;
}

function displayOverallScore(score) {
    const overallScoreElement = document.getElementById('overall-score');
    overallScoreElement.textContent = `Your overall score: ${score}/10`;
}

