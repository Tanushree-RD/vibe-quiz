const questions = [
  {
    question: "Your friend cancels plans last minute. You say...",
    options: [
      "Bet. More sleep for me ",
      "Bro I got ready for NOTHING ",
      "No worries, time to grind ",
      "Send them a meme "
    ],
    vibes: ["Chill Minimalist", "Main Character", "Ambitious Dreamer", "Meme Philosopher"]
  },
  {
    question: "Pick your go-to emoji combo:",
    options: ["😭💀", "✨🤭", "😎🔥", "💅🫶"],
    vibes: ["Meme Philosopher", "Chill Minimalist", "Ambitious Dreamer", "Main Character"]
  },
  {
    question: "You wake up late. What's your move?",
    options: [
      "Scroll for ‘5 mins’ (aka 1 hour)",
      "Manifest a better version of me ",
      "Text ‘omw’ while brushing",
      "Panic, then still be late"
    ],
    vibes: ["Meme Philosopher", "Ambitious Dreamer", "Main Character", "Chill Minimalist"]
  },
  {
    question: "If your life had a background song:",
    options: [
      "Calm lo-fi beats ",
      "Main character moment ",
      "Trap anthem of success ",
      "That weird TikTok sound "
    ],
    vibes: ["Chill Minimalist", "Main Character", "Ambitious Dreamer", "Meme Philosopher"]
  },
  {
    question: "Your fashion vibe?",
    options: [
      "Oversized & comfy",
      "Aesthetic minimalist",
      "Designer or die ",
      "Whatever makes people laugh "
    ],
    vibes: ["Chill Minimalist", "Ambitious Dreamer", "Main Character", "Meme Philosopher"]
  }
];

let currentQuestion = 0;
let answers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

 function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", () => {
      // Remove previous selections
      const allButtons = optionsElement.querySelectorAll("button");
      allButtons.forEach(btn => btn.classList.remove("selected"));

      // Add selection style to this one
      button.classList.add("selected");

      // Record answer
      answers[currentQuestion] = q.vibes[index];
      nextButton.disabled = false;
    });

    optionsElement.appendChild(button);
  });
}


nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.disabled = true;
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";

  const personality = getPersonality(answers);
  const resultText = `You got: "${personality}" 💅`;
  document.getElementById("result-text").textContent = resultText;

  const shareText = `${resultText} — What's your Gen Z vibe?`;
  const quizUrl = "https://tanushree-rd.github.io/genz-vibe-quiz/";

  document.getElementById("twitter").href =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(quizUrl)}`;
  document.getElementById("whatsapp").href =
    `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + quizUrl)}`;
  document.getElementById("instagram").href = quizUrl;
}

function getPersonality(answers) {
  const count = {};
  answers.forEach(vibe => count[vibe] = (count[vibe] || 0) + 1);
  return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
}

showQuestion();
nextButton.disabled = true;

