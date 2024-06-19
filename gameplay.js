// List of all 5 letter words
import { WORDS } from "./validWords.js";

// Variables
var TOTAL_TRIES = 6;
var WORD_LEN = 5;
var currRow = 0;
var currCol = 0;
var gameEnd = false;
let solution = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(solution);

window.onload = function() {
    startGame();
}

function startGame() {
    // Setup gameboard
    createGameBoard();

    // Display keyboard buttons for users
    displayKeyboard();

    // Keyboard event listener
    document.addEventListener("keyup", addLetter);
}

function createGameBoard() {
    for (let i = 0; i < TOTAL_TRIES; i++) {
        for (let j = 0; j < WORD_LEN; j++) {
            let letterBox = document.createElement("span");
            letterBox.id = `${i}${j}`;
            letterBox.className = "letter-box";
            letterBox.textContent = "";
            document.getElementById("game-board").appendChild(letterBox);
        }
    }
}

function displayKeyboard() {
    const keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        [" ", "A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
    ];

    keyboard.forEach(row => {
        const keyboardRow = document.createElement("div");
        keyboardRow.className = "keyboard-row";

        row.forEach(key => {
            const keyButton = document.createElement("div");
            keyButton.textContent = key;

            switch (key) {
                case "ENTER":
                    keyButton.id = "Enter";
                    keyButton.className = "enter-button";
                    break;
                case "⌫":
                    keyButton.id = "Backspace";
                    keyButton.className = "key-button";
                    break;
                case " ":
                    keyButton.id = "Space";
                    keyButton.className = "empty-button";
                    break;
                default:
                    keyButton.id = `Key${key}`;
                    keyButton.className = "key-button";
                    break;
            }

            keyButton.addEventListener("click", handleUserInput);
            keyboardRow.appendChild(keyButton);
        });

        document.getElementById("keyboard-container").appendChild(keyboardRow);
    });
}

// Handle user input from both typing and buttons
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
        document.getElementById("answer").textContent = solution;
        alert("The correct word was: " + solution);
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
    let guess = "";
    document.getElementById("answer").textContent = "";

    // String up the guesses into the word
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        guess += pressedKey.textContent;
    }

    //guess = guess.toLowerCase(); // Case insensitive
    console.log(guess);

    if (!WORDS.includes(guess)) {
        alert("Not in word list!");
        return;
    }

    // Start processing guess
    let correct = 0;
    let letterCount = {};

    // Build letter count
    [...solution].forEach(letter => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    console.log(letterCount);

    // First iteration: check all the correct ones first
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        let letter = pressedKey.textContent;

        // Check if the letter is in the correct position
        if (solution[i] === letter) {
            pressedKey.classList.add("right-letter");
            let keyButton = document.getElementById(`Key${letter}`);
            keyButton.classList.remove("insolution-letter");
            keyButton.classList.add("right-letter");
            correct += 1;
            letterCount[letter] -= 1; // Deduct the letter count
        }
    }

    if (correct === WORD_LEN) {
        gameEnd = true;
    }

    console.log(letterCount);

    // Second iteration: mark which ones are present but in wrong position
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        let letter = pressedKey.textContent;

        if (!pressedKey.classList.contains("right-letter")) {
            let keyButton = document.getElementById(`Key${letter}`);
            if (solution.includes(letter) && letterCount[letter] > 0) {
                pressedKey.classList.add("insolution-letter");
                if (!keyButton.classList.contains("right-letter")) {
                    keyButton.classList.add("insolution-letter");
                }
                letterCount[letter] -= 1;
            } else {
                pressedKey.classList.add("wrong-letter");
                keyButton.classList.add("wrong-letter");
            }
        }
    }

    // Go to the next row
    currRow += 1;
    currCol = 0; 
}