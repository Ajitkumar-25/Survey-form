// Define the survey questions
const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10, how likely are you to recommend us to your friends and family?",
    type: "rating",
    min: 1,
    max: 10,
  },
  {
    id: 5,
    text: "What could we do to improve our service?",
    type: "text",
  },
];

// Current question index
let currentQuestionIndex = 0;

// Store answers
const answers = {};

// Display the welcome screen
function showWelcomeScreen() {
  document.getElementById("welcomeScreen").style.display = "block";
}

// Display the survey screen
function showSurveyScreen() {
  document.getElementById("surveyScreen").style.display = "block";
}

// Display the thank you screen
function showThankYouScreen() {
  document.getElementById("thankYouScreen").style.display = "block";
}

// Update the UI with the current question
function showCurrentQuestion() {
  const questionNumberElement = document.getElementById("questionNumber");
  const questionElement = document.getElementById("question");
  const answerOptionsElement = document.getElementById("answerOptions");

  questionNumberElement.textContent = `Question  :  ${currentQuestionIndex + 1}/${
    questions.length
  }`;

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.text;

  answerOptionsElement.innerHTML = "";

  if (currentQuestion.type === "rating") {
    for (let i = currentQuestion.min; i <= currentQuestion.max; i++) {
      const radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "answer";
      radioBtn.value = i;
      radioBtn.id = `option${i}`;
      answerOptionsElement.appendChild(radioBtn);

      const label = document.createElement("label");
      label.setAttribute("for", `option${i}`);
      label.textContent = i;
      answerOptionsElement.appendChild(label);
    }
  } else if (currentQuestion.type === "text") {
    const textbox = document.createElement("textarea");
    textbox.type="text"
    textbox.name = "answer";
    textbox.rows = 5;
    answerOptionsElement.appendChild(textbox);
  }
}

// Save the answer in the answers object
function saveAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const answerElement =
    document.querySelector('input[name="answer"]:checked') ||
    document.querySelector('textarea[name="answer"]');
  const answer = answerElement ? answerElement.value : "";

  answers[currentQuestion.id] = answer;
}

// Move to the next question
function nextQuestion() {
  saveAnswer();

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showCurrentQuestion();
  } else {
    showConfirmationDialog();
  }
}

// Move to the previous question
function previousQuestion() {
  saveAnswer();

  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showCurrentQuestion();
  }
}

// Skip the current question
function skipQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showCurrentQuestion();
  } else {
    showConfirmationDialog();
  }
}

// Show a confirmation dialog before submitting the survey
function showConfirmationDialog() {
  if (confirm("Are you sure you want to submit the survey?")) {
    submitSurvey();
  }
}

// Simulate submitting the survey and show the thank you screen
// Simulate submitting the survey and show the thank you screen
// Simulate submitting the survey and show the thank you screen
// Simulate submitting the survey and show the thank you screen
// Simulate submitting the survey and show the thank you screen
// Simulate submitting the survey and show the thank you screen
function submitSurvey() {
  // Save the survey data to the database or local storage
  const surveyData = {
    sessionId: generateSessionId(),
    answers: answers,
  };
  console.log(surveyData);

  // Save survey data in local storage
  localStorage.setItem("surveyData", JSON.stringify(surveyData));

  showThankYouScreen();
  // Reset the survey and redirect to the welcome screen after 5 seconds
  setTimeout(() => {
    window.location.reload(); // Refresh the page to go back to the welcome screen
  }, 5000);
}

// Generate a random session ID
function generateSessionId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let sessionId = "";
  for (let i = 0; i < 10; i++) {
    sessionId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return sessionId;
}

// Attach event listeners to buttons
document.getElementById("startButton").addEventListener("click", () => {
  showSurveyScreen();
  showCurrentQuestion();
});

document
  .getElementById("previousButton")
  .addEventListener("click", previousQuestion);
document.getElementById("nextButton").addEventListener("click", nextQuestion);
document.getElementById("skipButton").addEventListener("click", skipQuestion);

// Show the welcome screen initially
showWelcomeScreen();
