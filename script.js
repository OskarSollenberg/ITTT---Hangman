// VARIABLES
const input = document.getElementById("userInput");
const answer = document.getElementById("answer");
const card = document.getElementById("card");
const lives = document.getElementById("life");
const liveForToggleVisability = document.getElementById("lives");

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
count = 0;
lifeCount = 5;
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
                        console.log(wordArr);
                        updateCorrectGuessList();
                    }
                }
            else {
                addClass(images[count], "visable");
                count++;
                lifeCount--;
                lives.innerHTML = lifeCount;
                if (count > 4) {
                    removeClass(images[count - 2], "visable");
                }

                addAnimation(card, "wobble");
                setTimeout(resetAnimation, 1000, card, "wobble");
            }
            guessedLetters += input.value;
        }
        resetValue(input);
    });
});

//  for (let i = 0; i < word.length; i++) {

// && word.includes(input.value))

// let word = prompt(`player1 picks a word`);
// alert(`player 2 guess a letter`);
// let wordArray = word.split(``);
// let lineArray = wordArray.fill(` _ `);
// let life = 10;
// while (true) {
//     let guess = prompt(`lives: ${life} ${lineArray}`);
//     if (word.includes(guess)) {
//         for (let i = 0; i < word.length; i++) {
//             if (guess === word[i]) {
//                 lineArray[i] = guess;
//             }
//         }
//     } else if (word.includes(guess) === false) {
//         life -= 1;
//     }
//     if (life === 0) {
//         alert(`you're hanged man!!`);
//         break;
//     } else if (lineArray.includes(` _ `) === false) {
//         alert(`horrraayyy!!!`);
//         break;
//     }
// }
