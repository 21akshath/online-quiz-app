/* Quiz Galaxy - full-featured script
   Features:
   - multiple categories (36+ questions)
   - per-question feedback (right/wrong + explanation)
   - per-question timer (30s)
   - progress bar
   - Ultimate mode (random mix 10 Qs)
   - Leaderboard saved in localStorage (shown on result screen)
*/

// -----------------------------
// 1) QUESTION DATABASE (36+ questions)
// -----------------------------
const quizDB = {
  general: [
    { question: "Who is known as the Father of the Nation (India)?", answers:{ a:"Mahatma Gandhi", b:"Jawaharlal Nehru", c:"Subhash Chandra Bose", d:"Bhagat Singh" }, correct:"a", explanation:"Mahatma Gandhi led India's non-violent independence movement." },
    { question: "Which is the largest continent?", answers:{ a:"Africa", b:"Asia", c:"Europe", d:"North America" }, correct:"b", explanation:"Asia covers the largest land area of any continent." },
    { question: "What is the national currency of Japan?", answers:{ a:"Won", b:"Yen", c:"Yuan", d:"Dollar" }, correct:"b", explanation:"Japan's currency is the Yen (¥)." },
    { question: "Where are the Great Pyramids located?", answers:{ a:"India", b:"Egypt", c:"Mexico", d:"Iraq" }, correct:"b", explanation:"The Pyramids of Giza are in Egypt." },
    { question: "Which ocean is the largest?", answers:{ a:"Atlantic", b:"Pacific", c:"Indian", d:"Arctic" }, correct:"b", explanation:"The Pacific Ocean is the largest and deepest ocean." },
    { question: "Which country is called the Land of the Rising Sun?", answers:{ a:"China", b:"India", c:"Japan", d:"Thailand" }, correct:"c", explanation:"Japan is historically known as the Land of the Rising Sun." }
  ],
  science: [
    { question:"What planet is known as the Red Planet?", answers:{ a:"Venus", b:"Mars", c:"Jupiter", d:"Mercury" }, correct:"b", explanation:"Mars appears red due to iron oxide (rust) on its surface." },
    { question:"What gas do plants release during photosynthesis?", answers:{ a:"Carbon Dioxide", b:"Oxygen", c:"Nitrogen", d:"Hydrogen" }, correct:"b", explanation:"Plants release oxygen as a byproduct of photosynthesis." },
    { question:"What is the chemical symbol for water?", answers:{ a:"O2", b:"CO2", c:"H2O", d:"HO2" }, correct:"c", explanation:"Water consists of two hydrogen atoms and one oxygen atom (H2O)." },
    { question:"How many bones does an adult human body have?", answers:{ a:"206", b:"201", c:"208", d:"210" }, correct:"a", explanation:"An adult human skeleton has 206 bones." },
    { question:"What gas do humans breathe in to survive?", answers:{ a:"Carbon Dioxide", b:"Oxygen", c:"Nitrogen", d:"Helium" }, correct:"b", explanation:"Humans require oxygen for cellular respiration." },
    { question:"What is the powerhouse of the cell?", answers:{ a:"Nucleus", b:"Mitochondria", c:"Ribosome", d:"Chloroplast" }, correct:"b", explanation:"Mitochondria generate ATP, the cell's energy currency." }
  ],
  computers: [
    { question:"Which language runs in the browser?", answers:{ a:"Python", b:"Java", c:"C", d:"JavaScript" }, correct:"d", explanation:"JavaScript is the native language of web browsers." },
    { question:"What does HTTP stand for?", answers:{ a:"HyperText Transfer Protocol", b:"HighText Transfer Protocol", c:"Hyper Transfer Process", d:"Hyper Transmission Path" }, correct:"a", explanation:"HTTP is the protocol used for web communication." },
    { question:"Which company created Windows OS?", answers:{ a:"Apple", b:"Microsoft", c:"IBM", d:"Google" }, correct:"b", explanation:"Microsoft developed the Windows operating system." },
    { question:"What does CPU stand for?", answers:{ a:"Central Processing Unit", b:"Computer Primary Unit", c:"Central Power Utility", d:"Control Processing User" }, correct:"a", explanation:"CPU is the primary processor in a computer." },
    { question:"Which is the first search engine?", answers:{ a:"Google", b:"Yahoo", c:"Archie", d:"Lycos" }, correct:"c", explanation:"Archie (1990) is considered the first search engine." },
    { question:"What is the full form of AI?", answers:{ a:"Automatic Intelligence", b:"Artificial Intelligence", c:"Advanced Integration", d:"Active Internet" }, correct:"b", explanation:"AI stands for Artificial Intelligence." }
  ],
  sports: [
    { question:"How many players are in a football team?", answers:{ a:"9", b:"10", c:"11", d:"12" }, correct:"c", explanation:"A football team fields 11 players including the goalkeeper." },
    { question:"Wimbledon is famous for which sport?", answers:{ a:"Cricket", b:"Football", c:"Tennis", d:"Hockey" }, correct:"c", explanation:"Wimbledon is the oldest major tennis tournament." },
    { question:"Which country won the FIFA World Cup 2018?", answers:{ a:"Germany", b:"Brazil", c:"France", d:"Argentina" }, correct:"c", explanation:"France defeated Croatia in the 2018 final." },
    { question:"Who is known as the 'God of Cricket'?", answers:{ a:"MS Dhoni", b:"Virat Kohli", c:"Sachin Tendulkar", d:"Kapil Dev" }, correct:"c", explanation:"Sachin Tendulkar is widely revered as the 'God of Cricket'." },
    { question:"How many Olympic rings are there?", answers:{ a:"4", b:"5", c:"6", d:"7" }, correct:"b", explanation:"The five rings represent the five inhabited continents." },
    { question:"Which sport uses the terms 'love' and 'deuce'?", answers:{ a:"Cricket", b:"Tennis", c:"Badminton", d:"Hockey" }, correct:"b", explanation:"Those scoring terms are specific to tennis." }
  ],
  arts: [
    { question:"Who painted the Mona Lisa?", answers:{ a:"Pablo Picasso", b:"Vincent van Gogh", c:"Leonardo da Vinci", d:"Michelangelo" }, correct:"c", explanation:"Leonardo da Vinci painted the Mona Lisa." },
    { question:"Which is the national dance of India?", answers:{ a:"Kathak", b:"Bharatanatyam", c:"Odissi", d:"Kuchipudi" }, correct:"b", explanation:"Bharatanatyam is one of India's classical dance forms." },
    { question:"Shakespeare was famous for writing?", answers:{ a:"Novels", b:"Poems & Plays", c:"Paintings", d:"Essays" }, correct:"b", explanation:"William Shakespeare wrote many plays and poems." },
    { question:"Which country is famous for Samurai culture?", answers:{ a:"China", b:"Japan", c:"Thailand", d:"Korea" }, correct:"b", explanation:"Samurai are traditional warriors from Japan." },
    { question:"Which Indian festival is known as the Festival of Lights?", answers:{ a:"Holi", b:"Diwali", c:"Pongal", d:"Navratri" }, correct:"b", explanation:"Diwali is celebrated with lights, diyas and fireworks." },
    { question:"Which language is the most spoken worldwide?", answers:{ a:"English", b:"Mandarin Chinese", c:"Spanish", d:"Hindi" }, correct:"b", explanation:"Mandarin Chinese has the largest number of native speakers." }
  ]
};

// -----------------------------
// State variables
// -----------------------------
let currentCategory = [];
let currentCategoryKey = '';
let currentQuestion = 0;
let score = 0;
let timer = null;
const QUESTION_TIME = 30; // seconds per question
let timeLeft = QUESTION_TIME;

// DOM references
const startScreen = () => document.getElementById('start-screen');
const categoryScreen = () => document.getElementById('category-screen');
const quizScreen = () => document.getElementById('quiz-screen');
const resultScreen = () => document.getElementById('result-screen');
const quizContainer = () => document.getElementById('quiz');
const timerDisplay = () => document.getElementById('timer');
const progressBar = () => document.getElementById('progress-bar');
const submitBtn = () => document.getElementById('submit-btn');
const nextBtn = () => document.getElementById('next-btn');

// -----------------------------
// Utility: getUltimateQuiz
// -----------------------------
function getUltimateQuiz() {
  let all = [];
  for (let cat in quizDB) all = all.concat(quizDB[cat]);
  // shuffle
  all = all.sort(() => Math.random() - 0.5);
  return all.slice(0, 10);
}

// -----------------------------
// Navigation helpers
// -----------------------------
function showCategories() {
  startScreen().classList.add('d-none');
  categoryScreen().classList.remove('d-none');
  resultScreen().classList.add('d-none');
  quizScreen().classList.add('d-none');
}

function startQuiz(categoryKey) {
  // choose questions
  currentCategoryKey = categoryKey;
  if (categoryKey === 'ultimate') {
    currentCategory = getUltimateQuiz();
  } else {
    currentCategory = quizDB[categoryKey].slice(); // copy
  }
  currentQuestion = 0;
  score = 0;

  // UI switch
  startScreen().classList.add('d-none');
  categoryScreen().classList.add('d-none');
  resultScreen().classList.add('d-none');
  quizScreen().classList.remove('d-none');

  // label
  document.getElementById('category-label').textContent = `Category: ${categoryKey === 'ultimate' ? 'Ultimate Knowledge Test' : capitalize(categoryKey)}`;

  buildQuestion();
  startTimer();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// -----------------------------
// Build Question (one-at-a-time)
// -----------------------------
function buildQuestion() {
  clearInterval(timer);
  timeLeft = QUESTION_TIME;
  updateTimerDisplay();
  submitBtn().disabled = false;
  nextBtn().disabled = true;
  nextBtn().classList.add('disabled');

  const q = currentCategory[currentQuestion];
  const answersHtml = Object.keys(q.answers).map(letter => {
    // use radio with label; add data-letter on label for ease
    return `<label class="d-block mb-2" id="lbl-${letter}">
              <input type="radio" name="answer" value="${letter}"> <strong>${letter.toUpperCase()}:</strong> ${q.answers[letter]}
            </label>`;
  }).join('');

  quizContainer().innerHTML = `
    <div class="question h5 mb-3">${currentQuestion+1}. ${q.question}</div>
    <div class="answers">${answersHtml}</div>
    <div id="feedback" class="mt-2"></div>
  `;

  updateProgress();
}

// -----------------------------
// Timer & Progress
// -----------------------------
function startTimer() {
  clearInterval(timer);
  timeLeft = QUESTION_TIME;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      // auto-submit as wrong if none selected
      autoSubmit();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay().textContent = `⏳ ${timeLeft}s`;
}

function updateProgress() {
  const percent = ((currentQuestion) / currentCategory.length) * 100;
  progressBar().style.width = `${percent}%`;
}

// -----------------------------
// Submit / Check Answer / Feedback
// -----------------------------
function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert('Please select an answer before submitting (or time will auto-submit).');
    return;
  }
  checkAnswerAndGiveFeedback(selected.value);
}

function autoSubmit() {
  // no selected answer -> treat as wrong
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    checkAnswerAndGiveFeedback(null); // null means no answer chosen
  } else {
    checkAnswerAndGiveFeedback(selected.value);
  }
}

function checkAnswerAndGiveFeedback(selectedValue) {
  clearInterval(timer);

  const q = currentCategory[currentQuestion];
  const correct = q.correct;
  const feedbackEl = document.getElementById('feedback');
  const answersLabels = document.querySelectorAll('.answers label');

  // mark all as normal, then color
  answersLabels.forEach(lbl => {
    lbl.classList.remove('answer-correct','answer-wrong');
    // detect value
    const input = lbl.querySelector('input');
    if (!input) return;
    const val = input.value;
    if (val === correct) {
      lbl.classList.add('answer-correct');
    }
    if (selectedValue && val === selectedValue && selectedValue !== correct) {
      lbl.classList.add('answer-wrong');
    }
  });

  // handle scoring
  if (selectedValue && selectedValue === correct) {
    score++;
    feedbackEl.innerHTML = `<span class="text-success">✅ Correct!</span><div class="small text-muted mt-1">${q.explanation}</div>`;
  } else {
    // show correct answer + explanation
    const correctText = q.answers[correct];
    feedbackEl.innerHTML = `<span class="text-danger">❌ Wrong.</span> <small class="d-block mt-1">Correct: <strong>${correct.toUpperCase()}</strong> — ${correctText}</small><div class="small text-muted mt-1">${q.explanation}</div>`;
  }

  // disable submit; allow next
  submitBtn().disabled = true;
  nextBtn().disabled = false;
  nextBtn().classList.remove('disabled');

  // update progress to show progress for this completed question
  updateProgress();
}

// -----------------------------
// Next Question / End
// -----------------------------
function nextQuestion() {
  // move to next
  currentQuestion++;
  if (currentQuestion < currentCategory.length) {
    buildQuestion();
    startTimer();
  } else {
    // finished
    showResults();
  }
}

// -----------------------------
// RESULTS + Leaderboard
// -----------------------------
function showResults() {
  clearInterval(timer);
  quizScreen().classList.add('d-none');
  resultScreen().classList.remove('d-none');

  const total = currentCategory.length;
  const percent = Math.round((score / total) * 100);
  let badgeText = '';
  if (percent === 100) badgeText = '🥇 Legend — Perfect Score!';
  else if (percent >= 70) badgeText = '🥈 Pro — Great Job!';
  else if (percent >= 40) badgeText = '🥉 Nice — Keep Practicing!';
  else badgeText = '📘 Keep Learning — You got this!';

  document.getElementById('score-text').textContent = `You scored ${score} out of ${total} (${percent}%). ${badgeText}`;

  // show leaderboard
  renderLeaderboard();
}

function saveScore() {
  const nameInput = document.getElementById('player-name');
  const name = nameInput.value.trim() || 'Anonymous';
  const entry = { name, category: currentCategoryKey === 'ultimate' ? 'Ultimate' : capitalize(currentCategoryKey), score, total: currentCategory.length, date: new Date().toISOString() };

  // get existing
  const raw = localStorage.getItem('quiz_galaxy_leaderboard');
  let list = raw ? JSON.parse(raw) : [];
  list.push(entry);
  // sort by score desc, keep top 20
  list.sort((a,b) => b.score - a.score || (new Date(b.date) - new Date(a.date)));
  list = list.slice(0, 50);
  localStorage.setItem('quiz_galaxy_leaderboard', JSON.stringify(list));

  nameInput.value = '';
  renderLeaderboard();
  alert('Score saved! You can see it on the leaderboard below.');
}

function renderLeaderboard() {
  const raw = localStorage.getItem('quiz_galaxy_leaderboard');
  const list = raw ? JSON.parse(raw) : [];
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '';
  list.forEach((e, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${idx+1}</td><td>${escapeHtml(e.name)}</td><td>${escapeHtml(e.category)}</td><td>${e.score}/${e.total}</td>`;
    tbody.appendChild(tr);
  });
}

function clearLeaderboard() {
  if (!confirm('Clear entire leaderboard?')) return;
  localStorage.removeItem('quiz_galaxy_leaderboard');
  renderLeaderboard();
}

function restartToCategories() {
  resultScreen().classList.add('d-none');
  categoryScreen().classList.remove('d-none');
  // reset UI
  document.getElementById('player-name').value = '';
}

// -----------------------------
// Helpers
// -----------------------------
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]) });
}
