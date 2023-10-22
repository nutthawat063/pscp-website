const paragraphs = ["In the realm of technology and innovation, the rapid pace of change is both exhilarating and demanding. As we navigate the digital landscape, staying adaptable and embracing new tools and ideas becomes essential. The synergy of creativity and efficiency propels us forward, enabling us to harness the full potential of our connected world. With every keystroke, we advance towards a future where possibilities are limitless.",
"When asked how he wished to be buried, he left instructions to be thrown outside the city wall so wild animals could feast on his body. When asked if he minded this, he said, 'Not at all, as long as you provide me with a stick to chase the creatures away!' When asked how he could use the stick since he would lack awareness, he replied: 'If I lack awareness, then why should I care what happens to me when I am dead?'",
"Aim for a love that reminds you of the devotion The Sun has to The Moon. Whether she is in fractions or she is whole, he still shrouds his intense light in the darkness of the night. To give her the entire sky, without judgment, so she can shine in any way she wants to. You deserve someone who adores you on the days you are in broken fragments too. You deserve someone who lets you glow in every way you need to.",
"Deep into that darkness peering, Long, I stood there, wondering, fearing, Doubting, dreaming dreams no mortals. Ever dared to dream before, But the silence was unbroken, And the stillness gave no token, And the only word there spoken. Was the whispered word, “Lenore!” This I whispered, and an echo. Murmured back the word, “Lenore!” Merely this, and nothing more.",
"Close your eyes and think about that boy. Tell me how he makes you feel. Let your mind trace over his tired shoulders. Allow your thoughts to linger on that beautiful smile. Take a deep breath and try to put those dark thoughts aside. For once, let go of the reins you've wrapped so tightly around your heart. I know you are scared. Who could blame you? Love is a hurricane wrapped inside a chrysalis. And you are a girl walking into the storm.",
"Sometimes two people, no matter how hard they try t omake it work, just aren't meat to be. Love can do strange things to you, but it shouldn't ever make you forget your worth. When you least expect it, someone great will come along. Someone that will teach you all things you got wrong about love. When you finally cross the paths with the right person,everything will feel different. Be patient, because you desece the world.",
"Let youself be sad, let yourself be a mess. But promise yourself that you'll try harder each day.That's all you can do. Take it day by day you'll learn that all this time maybe you deserved more.A beautiful thing happens when you give your hert time to heal itself. You find happiness again, and when you do, you know it because how far you've come when you thought you'd lost all hope, And if that's not something to look forward to, find it!"
]

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")
const accuracyTag = document.querySelector("#accuracy");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;
let accuracyElement = document.getElementById('accuracy');
accuracyElement.classList.add('high-accuracy');

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        let totalCharacters = charIndex;
        let accuracy = ((totalCharacters - mistakes) / totalCharacters) * 100;
        accuracy = accuracy.toFixed(2);
        accuracyTag.innerText = accuracy + "%";

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }

    let totalCharacters = charIndex;
    let accuracy = ((totalCharacters - mistakes) / totalCharacters) * 100;
    accuracy = accuracy.toFixed(2);

    let accuracyElement = document.getElementById('accuracy');
    accuracyElement.innerText = accuracy + "%";

    if (accuracy > 60) {
        accuracyElement.classList.add('high-accuracy');
    } else {
        accuracyElement.classList.remove('high-accuracy');
    }

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
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    accuracy.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);