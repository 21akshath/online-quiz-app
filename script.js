// Quiz Database
const quizDB = {
  general: [
    { question: "Who is the father of our nation?", answers: { a: "Mahatma Gandhi", b: "Jawaharlal Nehru", c: "Subhash Chandra Bose", d: "Bhagat Singh" }, correct: "a" },
    { question: "Which is the national animal of India?", answers: { a: "Lion", b: "Tiger", c: "Elephant", d: "Leopard" }, correct: "b" }
  ],
  science: [
    { question: "What planet is known as the Red Planet?", answers: { a: "Venus", b: "Mars", c: "Jupiter", d: "Mercury" }, correct: "b" },
    { question: "What gas do plants release during photosynthesis?", answers: { a: "Carbon Dioxide", b: "Oxygen", c: "Nitrogen", d: "Hydrogen" }, correct: "b" }
  ],
  computers: [
    { question: "Which language is used for web apps?", answers: { a: "Python", b: "JavaScript", c: "C++", d: "Java" }, correct: "b" },
    { question: "What does HTTP stand for?", answers: { a: "HyperText Transfer Protocol", b: "HighText Transfer Protocol", c: "Hyper Transfer Text Process", d: "None" }, correct: "a" }
  ],
  sports: [
    { question: "How many players in a football team?", answers: { a: "9", b: "10", c: "11", d: "12" }, correct: "c" },
    { question: "What sport is played at Wimbledon?", answers: { a: "Cricket", b: "Football", c: "Tennis", d: "Badminton" }, correct: "c" }
  ]
};

let currentCategory = [];
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

// Start Quiz
function startQuiz(category) {
  currentCategory = quizDB[category];
  document.querySelector(".category-container").classList.add("hidden");
  document.getElementById("quiz-section").classList.remove("hidden");
  buildQuiz();
}

// Build Quiz
function buildQuiz() {
  const output = [];
  currentCategory.forEach((q, index) => {
    const answers = [];
    for (letter in q.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${index}" value="${letter}"> 
          ${letter}: ${q.answers[letter]}
        </label>`
      );
    }
    output.push(`<div class="question">${q.question}</div><div class="answers">${answers.join("")}</div>`);
  });
  quizContainer.innerHTML = output.join("");
}

// Show Results
function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let score = 0;
  currentCategory.forEach((q, index) => {
    const answerContainer = answerContainers[index];
    const selector = `input[name=question${index}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === q.correct) {
      score++;
      answerContainers[index].style.color = "lightgreen";
    } else {
      answerContainers[index].style.color = "red";
    }
  });
  resultsContainer.innerHTML = `You scored ${score} out of ${currentCategory.length}`;
}

submitButton.addEventListener("click", showResults);
