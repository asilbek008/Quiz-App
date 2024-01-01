"use strict";

const questions = [
  {
    question: "Which is the largest animal in the World? ",
    answers: [
      { Text: "Shark", correct: false },
      { Text: "Blue Whale", correct: true },
      { Text: "Elephant", correct: false },
      { Text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the World? ",
    answers: [
      { Text: "Vatican City", correct: true },
      { Text: "Bhutan", correct: false },
      { Text: "Liverpool", correct: false },
      { Text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the World? ",
    answers: [
      { Text: "Kizilkum", correct: false },
      { Text: "Gobi", correct: false },
      { Text: "Sahari", correct: true },
      { Text: "Kalahari", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the World? ",
    answers: [
      { Text: "Asia", correct: false },
      { Text: "America", correct: false },
      { Text: "Africa", correct: true },
      { Text: "Australia", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answers-btns");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerBtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function HandleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    HandleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
