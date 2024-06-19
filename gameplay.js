import { WORDS } from "./validWords.js";

// Variables
var TOTAL_TRIES = 6;
var WORD_LEN = 5;
var currRow = 0;
var currCol = 0;
var gameEnd = false;
let solution = WORDS[Math.floor(Math.random() * WORDS.length)]

window.onload = function() {
    startGame();
}

function startGame() {
    // Setup gameboard
    for (let i = 0; i < TOTAL_TRIES; i++) {
        for (let j = 0; j < WORD_LEN; j++) {
            let letterBox = document.createElement("span");
            letterBox.id = `${i}${j}`;
            letterBox.className = "letter-box";
            letterBox.textContent = "";
            document.getElementById("game-board").appendChild(letterBox);
        }
    }

    // Keyboard event listener
    document.addEventListener("keyup", addLetter);
}

// 
function handleUserInput() {
    addLetter({ code: this.id });
}

function addLetter(key) {
    if (gameEnd)
        return;

    const pressedKey = key.code; 

    if ("KeyA" <= pressedKey && pressedKey <= "KeyZ") {
        handleLetter(pressedKey);
    } else if (pressedKey === "Backspace") {
        handleBack();
    } else if (pressedKey === "Enter") {
        checkWord();
    }

    // End game if all guesses used
    if (!gameEnd && currRow == TOTAL_TRIES) {
        gameEnd = true;
        // Show correct word to user

    }
}

function handleLetter(key) {
    // Ensure user is entering 5 letters
    if (currCol < WORD_LEN) {
        let currBox = document.getElementById(`${currRow}${currCol}`);
        if (!currBox.textContent) {
            currBox.textContent = key[3]; // Extract the character part of the keycode
            currCol++;
        }
    }
}

function handleBack() {
    // Ensure user has entered 'something' to delete
    if (currCol > 0) {
        currCol--;
        let currBox = document.getElementById(`${currRow}${currCol}`);
        currBox.textContent = ""; // Remove what was entered
    }
}

function checkWord() {
    
}
