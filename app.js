// js/app.js — हिंदी क्विज़ ऐप Main Logic

// ── State ──
let state = {
  category: '',
  questions: [],
  current: 0,
  score: 0,
  correct: 0,
  wrong: 0,
  timer: null,
  timeLeft: 15
};

const TIMER_MAX = 15;
const LETTERS = ['अ', 'ब', 'स', 'द'];
const CONFETTI_COLORS = ['#FF6B35', '#FFD700', '#00F5A0', '#FF3CAC', '#7B2FFF'];

// ── DOM Helpers ──
const $ = (id) => document.getElementById(id);
const show = (id) => { $(id).classList.add('active'); };
const hide = (id) => { $(id).classList.remove('active'); };

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  show(id);
}

// ── Home ──
function showHome() {
  $('scoreBar').classList.remove('show');
  clearTimer();
  showScreen('homeScreen');
}

// ── Start Quiz ──
function startQuiz(cat) {
  state.category = cat;
  state.questions = [...QUIZ_DATA[cat]].sort(() => Math.random() - 0.5);
  state.current = 0;
  state.score = 0;
  state.correct = 0;
  state.wrong = 0;

  $('scoreBar').classList.add('show');
  $('scoreVal').textContent = '0';
  $('progressFill').style.width = '0%';

  showScreen('quizScreen');
  loadQuestion();
}

// ── Load Question ──
function loadQuestion() {
  const q = state.questions[state.current];
  const total = state.questions.length;

  $('qNum').textContent = `प्रश्न ${state.current + 1} / ${total}`;
  $('qNumBar').textContent = `${state.current + 1}/${total}`;
  $('qText').textContent = q.q;
  $('qBadge').textContent = state.category;

  // Build options
  const container = $('optionsContainer');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span>${opt}`;
    btn.addEventListener('click', () => selectAnswer(i));
    container.appendChild(btn);
  });

  $('feedback').classList.remove('show');
  $('nextBtn').style.display = 'none';

  startTimer();
}

// ── Timer ──
function startTimer() {
  clearTimer();
  state.timeLeft = TIMER_MAX;
  updateTimerUI();

  state.timer = setInterval(() => {
    state.timeLeft--;
    updateTimerUI();
    if (state.timeLeft <= 0) {
      clearTimer();
      timeUp();
    }
  }, 1000);
}

function clearTimer() {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
}

function updateTimerUI() {
  const t = state.timeLeft;
  $('timerNum').textContent = t;
  const pct = (t / TIMER_MAX) * 100;
  const color = t > 8 ? '#FF6B35' : t > 4 ? '#FFD700' : '#FF3CAC';
  $('timerEl').style.background =
    `conic-gradient(${color} ${pct}%, rgba(255,255,255,0.08) 0%)`;
}

function timeUp() {
  const q = state.questions[state.current];
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  document.querySelectorAll('.option-btn')[q.ans].classList.add('correct');
  state.wrong++;
  showFeedback(false, 'समय समाप्त! ⏰', q.exp);
  showNextBtn();
}

// ── Select Answer ──
function selectAnswer(idx) {
  clearTimer();
  const q = state.questions[state.current];
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  if (idx === q.ans) {
    btns[idx].classList.add('correct');
    const pts = Math.max(10, state.timeLeft * 7);
    state.score += pts;
    state.correct++;
    $('scoreVal').textContent = state.score;
    showFeedback(true, `सही! 🎉 +${pts} अंक`, q.exp);
    launchConfetti();
  } else {
    btns[idx].classList.add('wrong');
    btns[idx].classList.add('shake');
    btns[q.ans].classList.add('correct');
    state.wrong++;
    showFeedback(false, 'गलत! 😔', q.exp);
  }

  // Progress bar
  const pct = ((state.current + 1) / state.questions.length) * 100;
  $('progressFill').style.width = pct + '%';

  showNextBtn();
}

function showNextBtn() {
  const btn = $('nextBtn');
  btn.style.display = 'block';
  btn.textContent = state.current < state.questions.length - 1
    ? 'अगला प्रश्न →'
    : 'परिणाम देखें 🏆';
}

// ── Next Question ──
function nextQuestion() {
  state.current++;
  if (state.current < state.questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// ── Feedback ──
function showFeedback(isCorrect, msg, exp) {
  const fb = $('feedback');
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
  fb.innerHTML = `<div>${msg}</div><div class="explanation">${exp}</div>`;
}

// ── Result ──
function showResult() {
  clearTimer();
  $('scoreBar').classList.remove('show');

  const total = state.questions.length;
  const pct = Math.round((state.correct / total) * 100);

  $('finalScore').textContent = state.score;
  $('resultCircle').style.setProperty('--pct', pct + '%');
  $('correctCount').textContent = state.correct;
  $('wrongCount').textContent = state.wrong;
  $('pctVal').textContent = pct + '%';

  let title, msg;
  if (pct >= 90) {
    title = 'अद्भुत! 🌟'; msg = 'आप विशेषज्ञ हैं! अपने मित्रों को चुनौती दें।';
    launchConfetti(); launchConfetti();
  } else if (pct >= 70) {
    title = 'बहुत अच्छे! 👏'; msg = 'शानदार प्रदर्शन! थोड़ी और मेहनत करें।';
    launchConfetti();
  } else if (pct >= 50) {
    title = 'ठीक है! 😊'; msg = 'अच्छा प्रयास! अभ्यास से और बेहतर होंगे।';
  } else {
    title = 'कोशिश जारी रखें! 💪'; msg = 'हिम्मत मत हारो! दोबारा कोशिश करें।';
  }

  $('resultTitle').textContent = title;
  $('resultMsg').textContent = msg;

  showScreen('resultScreen');
}

// ── Confetti ──
function launchConfetti() {
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left:${Math.random()*100}vw;
      top:-10px;
      background:${CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)]};
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      border-radius:${Math.random()>.5?'50%':'2px'};
      animation-duration:${1.5+Math.random()*1.5}s;
      animation-delay:${Math.random()*.5}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// ── PWA: Service Worker ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[PWA] SW registered:', reg.scope))
      .catch(err => console.log('[PWA] SW error:', err));
  });
}

// ── PWA: Install Banner ──
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $('installBanner').classList.add('show');
});

window.addEventListener('appinstalled', () => {
  $('installBanner').classList.remove('show');
  deferredPrompt = null;
  console.log('[PWA] App installed!');
});

function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      $('installBanner').classList.remove('show');
    }
    deferredPrompt = null;
  });
}

// ── Expose globals ──
window.startQuiz = startQuiz;
window.showHome = showHome;
window.nextQuestion = nextQuestion;
window.installApp = installApp;
