// VARIABLES
const input = document.getElementById("userInput");
const answer = document.getElementById("answer");
const card = document.getElementById("card");
const lives = document.getElementById("life");
const liveForToggleVisability = document.getElementById("lives");
const playAgain = document.getElementById("playAgain");
const pyro = document.getElementById("pyro");

const btn = document.getElementById("btn");

// IMAGES-------
const vertical = document.getElementById("img__ver");
const horizontal = document.getElementById("img__hor");
const mid = document.getElementById("img__mid");
const rope = document.getElementById("img__rope");
const guy = document.getElementById("img__guy");
//--------------

let word = "";

// ARRAYS
let images = [vertical, horizontal, mid, rope, guy];
let wordArr = [1, 2, 3, 4, 5];
wordArr = [];

// INTERCHANGABLE FUNCTIONS
addAnimation = (className, animation) => {
    className.classList.add(animation);
};
resetAnimation = (element, animation) => {
    element.classList.remove(animation);
};
addClass = (element, className) => {
    element.classList.add(className);
};
removeClass = (element, className) => {
    element.classList.remove(className);
};
resetValue = (element) => {
    element.value = "";
};
// ONE-TIME FUNCTIONS
createGuessList = () => {
    for (let i = 0; i < word.length; i++) {
        wordArr.push(" _ ");
    }
};
updateCorrectGuessList = () => {
    answer.innerHTML = wordArr.join("");
};
guessedBefore = () => {
    if (guessedLetters.includes(input.value)) {
        return true;
    } else {
        return false;
    }
};

// EXECUTIONS AND IF STATEMENTS
let guessedLetters = "";
imgCount = 0;
lifeCount = 5;
winConditionCounter = 0;
btn.addEventListener("click", function () {
    removeClass(images[0], "visable");
    removeClass(images[1], "visable");
    removeClass(images[2], "visable");
    removeClass(images[4], "visable");

    addClass(liveForToggleVisability, "visable");
    addClass(btn, "display--none");
    removeClass(input, "display--none");

    let words = prompt("Write a word for the other player to guess");
    word = words.toUpperCase();

    createGuessList();
    updateCorrectGuessList();

    input.addEventListener("keypress", function (press) {
        if (press.key === "Enter")
            if (guessedBefore() === true) {
                addAnimation(input, "wobble");
                setTimeout(resetAnimation, 1000, input, "wobble");
            }
        if (guessedBefore() === false) {
            if (word.includes(input.value.toUpperCase()))
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === input.value.toUpperCase()) {
                        wordArr[i] = word[i];
                        winConditionCounter++;
                        updateCorrectGuessList();
                        if (winConditionCounter === word.length) {
                            wordArr = ["YOU WIN!!"];
                            updateCorrectGuessList();

                            addClass(input, "display--none");
                            addClass(pyro, "pyro");

                            removeClass(playAgain, "display--none");

                            playAgain.addEventListener("click", function () {
                                location.reload();
                            });
                        }
                    }
                }
            else {
                addClass(images[imgCount], "visable");
                imgCount++;
                lifeCount--;
                lives.innerHTML = lifeCount;
                if (imgCount > 4) {
                    removeClass(images[imgCount - 2], "visable");
                    wordArr = ["YOU LOOSE!!"];
                    updateCorrectGuessList();
                    addClass(input, "display--none");
                    removeClass(playAgain, "display--none");
                    playAgain.addEventListener("click", function () {
                        location.reload();
                    });
                }

                addAnimation(card, "wobble");
                setTimeout(resetAnimation, 1000, card, "wobble");
            }
            guessedLetters += input.value;
        }
        resetValue(input);
    });
});
