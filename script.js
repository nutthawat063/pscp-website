fetch('typingwords.json')
  .then(response => response.json())
  .then(data => {
    paragraphs = data.word;
    console.log(paragraphs);
    loadParagraph(paragraphs);
    inpField.addEventListener("input", initTyping);
  })
const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".tryagain")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const accuracyTag = document.querySelector("#accuracy");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
let accuracyElement = document.getElementById('accuracy');
accuracyElement.classList.add('high-accuracy');

function loadParagraph(paragraphs) {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(event) {
  let characters = typingText.querySelectorAll("span");

  if (event.inputType === "deleteContentBackward") {
    backspace(characters);
  } else {
    typing(characters);
  }

  stats(characters);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace" && !event.repeat){
    event.preventDefault();
    backspace(characters);
  }
  inpField.focus();
})

function backspace(characters) {
  if (charIndex > 0) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  }
}

function typing(characters) {
  let typedChar = inpField.value.charAt(charIndex);

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar !== characters[charIndex].innerText) {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    } else {
      characters[charIndex].classList.add("correct");
    }

    charIndex++;
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function stats(characters) {
  let totalCharacters = charIndex;
  let accuracy = ((totalCharacters - mistakes) / totalCharacters) * 100;
  accuracy = accuracy.toFixed(2);
  accuracyTag.innerText = accuracy + "%";
  if (accuracy >= 95) {
    accuracyElement.classList.add('high-accuracy');
  } else {
    accuracyElement.classList.remove('high-accuracy');
  }

  let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

  wpmTag.innerText = wpm;
  mistakeTag.innerText = mistakes;
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
    console.log("Resetting the game...");
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    loadParagraph(paragraphs);
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    accuracyTag.innerText = 0 + "%";
}

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
