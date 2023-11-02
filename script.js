//---------------------------------------------------//
// Classes:
const input = document.getElementById("userInput");
const answer = document.getElementById("answer");
const word = "FOTBOLL";
//---------------------------------------------------//
//---------------------------------------------------//
// Creating underscores for each letter in word:
createUnderscores = (element) => {
    for (let i = 0; i < word.length; i++) {
        element.innerHTML += " _ ";
    }
};
createUnderscores(answer);
//---------------------------------------------------//
//---------------------------------------------------//
// Bootstrap-Animations adding and removing:
animate = (className, animation) => {
    className.classList.add(animation);
};
resetAnimation = (element, animation) => {
    element.classList.remove(animation);
};
//---------------------------------------------------//
// Resetting the value of the input-field to remove previous letter:
resetValue = (element) => {
    element.value = "";
};
//---------------------------------------------------//
// If press "Enter" && letter is "NOT" guessed before.
let playerGuess = "";
input.addEventListener("keypress", function (press) {
    if (press.key === "Enter" && playerGuess.includes(input.value) === false) {
        playerGuess += input.value;

        console.log(playerGuess);

        resetValue(input);
        //---------------------------------------------------//
        // If press "Enter" && letter "IS" guessed before.
    } else if (
        press.key === "Enter" &&
        playerGuess.includes(input.value) === true
    ) {
        input.classList.add("wobble");
        // resetAnimation(input, "wobble");
        setTimeout(resetAnimation, 1000, input, "wobble");

        resetValue(input);
    }
});

// if (answer.includes(input.value) === )

// let word = prompt(`player1 picks a word`);

// let wordArray = word.split(``);
// let lineArray = wordArray.fill(` _ `);
// let life = 5;

// while (true) {
//     // let guess = prompt(`lifes: ${life} ${lineArray}`);
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
//         // alert(`you're hanged man!!`);
//         break;
//     } else if (lineArray.includes(` _ `) === false) {
//         // alert(`horrraayyy!!!`);
//         break;
//     }
// }
