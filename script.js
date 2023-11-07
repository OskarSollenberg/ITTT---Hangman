// VARIABLES
const input = document.getElementById("userInput");
const card = document.getElementById("card");

// ANIMATIONS
const pyro = document.getElementById("pyro");

// LIVES
const lives = document.getElementById("life");
const liveForToggleVisability = document.getElementById("lives");

// BUTTONS
const playAgain = document.getElementById("playAgain");
const btn = document.getElementById("btn");

// IMAGES-------
const vertical = document.getElementById("img__ver");
const horizontal = document.getElementById("img__hor");
const mid = document.getElementById("img__mid");
const rope = document.getElementById("img__rope");
const guy = document.getElementById("img__guy");
//--------------

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
refreshPageOnBtnClick = (element) => {
    element.addEventListener("click", function () {
        location.reload();
    });
};

// ONE-TIME-USE FUNCTIONS
pickWord = () => {
    word = prompt("Write a word for the other player to guess").toUpperCase();
    return word;
};
createUnderlines = () => {
    for (let i = 0; i < word.length; i++) {
        wordArr.push(" _ ");
    }
};
updateUnderlineString = () => {
    answer.innerHTML = wordArr.join("");
};
guessedBefore = () => {
    if (allGuessedLetters.includes(input.value)) {
        return true;
    } else {
        return false;
    }
};
updateNumberOfLives = () => {
    lives.innerHTML = livesLeft;
};

// EXECUTIONS AND IF STATEMENTS
let word = "";
let allGuessedLetters = "";
let numOfIncorrectGuesses = 0;
let numOfcorrecGuesses = 0;

// ARRAYS
let images = [vertical, horizontal, mid, rope, guy];
let wordArr = [1, 2, 3, 4, 5];
wordArr = [];

// PLAY BTN / RESET GAMEBOARD
btn.addEventListener("click", btnClick);
function btnClick() {
    removeClass(images[0], "visable");
    removeClass(images[1], "visable");
    removeClass(images[2], "visable");
    removeClass(images[4], "visable");
    removeClass(input, "display--none");
    addClass(liveForToggleVisability, "visable");
    addClass(btn, "display--none");

    pickWord();
    createUnderlines();
    updateUnderlineString();

    input.addEventListener("keypress", function (press) {
        //
        //
        // INPUT VARIABLES
        let inputValue = input.value;
        let inputValueStr = inputValue.toString();
        let inputValueInCaps = inputValueStr.toUpperCase();
        //
        //
        // IF STATEMENTS
        if (press.key === "Enter") {
            //
            //
            // ALLREADY GUESSED LETTER
            if (guessedBefore()) {
                addAnimation(input, "wobble");
                setTimeout(resetAnimation, 1000, input, "wobble");
                //
                //
                // NEW LETTER
            } else if (
                guessedBefore() === false &&
                word.includes(input.value.toUpperCase())
            ) {
                //
                //
                // GUESSING CORRECT
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === inputValueInCaps) {
                        wordArr[i] = word[i];
                        numOfcorrecGuesses++;
                        updateUnderlineString();
                        //
                        //
                        // WINNING CONDITION
                        if (numOfcorrecGuesses === word.length) {
                            removeClass(playAgain, "display--none");
                            addClass(input, "display--none");
                            addClass(pyro, "pyro");

                            wordArr = ["YOU WIN!!"];
                            updateUnderlineString();

                            refreshPageOnBtnClick(playAgain);
                        }
                    }
                }
                //
                //
                // GUESSING WRONG
            } else if (guessedBefore() === false) {
                addClass(images[numOfIncorrectGuesses], "visable");

                addAnimation(card, "wobble");
                setTimeout(resetAnimation, 1000, card, "wobble");

                numOfIncorrectGuesses++;
                livesLeft = 5 - numOfIncorrectGuesses;
                updateNumberOfLives();
                //
                //
                // LOOSING CONDITION
                if (numOfIncorrectGuesses > 4) {
                    removeClass(images[numOfIncorrectGuesses - 2], "visable");
                    removeClass(playAgain, "display--none");
                    addClass(input, "display--none");

                    wordArr = ["YOU LOOSE!!"];
                    updateUnderlineString();

                    refreshPageOnBtnClick(playAgain);
                }
            }
        }
        //
        //
        // RESETTING INPUT VALUES & ADDING LETTER TO GUESSEDLETTER-LIST
        allGuessedLetters += inputValue;
        resetValue(input);
    });
}
