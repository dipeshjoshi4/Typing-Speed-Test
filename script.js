const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const Mistakes = document.querySelector(".Mistakes span");
const wpmElement = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const button = document.querySelector("button");


//Set Values
let timer;
let maxTime = 30;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;
let wpmVal = 0;



function loadParagraph() {

    const Pargraph = [
        "All the world’s a stage, and all the men and women merely players.",
        "Ask not what your country can do for you; ask what you can do for your country.",
        "You can fool all of the people some of the time, and some of the people all of the time, but you can't fool all of the people all of the time.",
        "What we've got here is failure to communicate. Some men you just can't reach.",
        "Two roads diverged in a wood, and I, I took the one less travelled by, and that has made all the difference.",
        "Tis better to have loved and lost than never to have loved at all.",
        "Find out who you are and be that person.That’s what your soul was put on this earth to be.Find the truth, live that truth, and everything else will come.",
        "For me, becoming isn’t about arriving somewhere or achieving a certain aim. I see it instead as forward motion, a means of evolving, a way to reach continuously toward a better self. The journey doesn’t end.",
        "Promise me you’ll always remember: You’re braver than you believe, and stronger than you seem, and smarter than you think.",
        "That’s one small step for a man, a giant leap for mankind."
    ]


    const randomIndex = Math.floor(Math.random() * Pargraph.length);

    typingText.innerHTML = "";

    for (const char of Pargraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`; //add span + all charcters+++
    }

    typingText.querySelectorAll('span')[0].classList.add('active');

    //input hide so we need to focus on type noticable
    document.addEventListener('keydown', () => { input.focus() });
    typingText.addEventListener('click', () => { input.focus() });
}

//handle User Input

function initTyping() {

    //take all charcter
    const char = document.querySelectorAll('span');

    //typedchar match 
    const typedChar = input.value.charAt(charIndex);

    //sentene length and time left then do operation
    if (charIndex < char.length && timeLeft > 0) {

        //for timing condition to be true
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        //for the ccharcter match then what and not match then what
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log("correct")
        }
        else {
            mistake++
            char[charIndex].classList.add('incorrect');
            console.log("Incorrect")
        }
        charIndex++
        char[charIndex].classList.add('active');
        Mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else {
        clearInterval(timer);
        input.value = ' ';
    }

}


function initTime() {
    if (timeLeft > 0) {
        timeLeft--
        time.innerText = timeLeft;
        //wpm
        let wpm = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
        wpm = wpm < 0 || !isFinite(wpm) ? 0 : wpm; // Ensure WPM is not negative or infinite
        wpmElement.innerText = wpm;
    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = ' ';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpmElement.innerText = 0;
    cpm.innerText = 0;
    Mistakes.innerText = 0;
}

//btn reset function
button.addEventListener("click", reset)

//When Someone Input While so we get to know someone is typing
input.addEventListener("input", initTyping);

//when the end of sentence



loadParagraph()