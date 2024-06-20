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

function startGame() {
    // Setup gameboard
    createGameBoard();

    // Display keyboard buttons for users
    displayKeyboard();

    // Keyboard event listener
    document.addEventListener("keyup", addLetter);
}

// Create the letter boxes for the guesses
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

// Create the keyboard to display on screen for user to click
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

// Direct responses for different user inputs
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
        const correctWord = document.createElement("div");
        correctWord.className = "correct-word";
        correctWord.textContent = solution;
        popup("The correct word was: " + solution);
    }
}

// Handle response to user pressing a key other than enter or back
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

// Handle response to user pressing back button
function handleBack() {
    // Ensure user has entered 'something' to delete
    if (currCol > 0) {
        currCol--;
        let currBox = document.getElementById(`${currRow}${currCol}`);
        currBox.textContent = ""; // Remove what was entered
    }
}

// Check user's word, colour boxes accordingly
function checkWord() {
    let input = [];
    let count = {};
    let correctPositions = [];

    // Collect each letter of user's input
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        input.push(pressedKey.textContent);
    }

    input = input.join(""); 

    console.log(input);

    // Check if the guess is in the list of valid words
    if (!WORDS.includes(input)) {
        popup("Not in word list!"); // Alert user if not
        return;
    }

    // Count the occurences of each letter in the solution
    for (const letter of solution) {
        count[letter] = (count[letter] ?? 0) + 1;
    }
    console.log(count);

    // Check if any of the letters in user input are correct (in right place)
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        let letter = pressedKey.textContent;

        if (solution[i] === letter) {
            // Change colour of letter box to colour for right letters
            pressedKey.classList.add("right-letter");

            let keyButton = document.getElementById(`Key${letter}`);
            // Remove class if letter previously found in wrong place or not found
            keyButton.classList.remove("insolution-letter", "wrong-letter");
            // Change colour of keyboard button to colour for right letters
            keyButton.classList.add("right-letter");
            correctPositions.push(i);
            count[letter] -= 1; // Found letter, so remove from count
        }
    }

    // Check if any of the letters in user input are present but not right place
    for (let i = 0; i < WORD_LEN; i++) {
        let pressedKey = document.getElementById(`${currRow}${i}`);
        let letter = pressedKey.textContent;

        if (!pressedKey.classList.contains("right-letter")) {
            let keyButton = document.getElementById(`Key${letter}`);

            // Check if the solution contains this letter
            if (count[letter] > 0) {
                // Change colour of letter box to colour for letters in solution
                pressedKey.classList.add("insolution-letter");
                if (!keyButton.classList.contains("right-letter")) {
                    // Change colour of keyboard button to colour for letters in solution
                    keyButton.classList.add("insolution-letter");
                }
                count[letter] -= 1; // 'Found' letter, so remove from count
            } else { // Letter not present
                pressedKey.classList.add("wrong-letter");
                keyButton.classList.remove("right-letter", "insolution-letter");
                keyButton.classList.add("wrong-letter");
            }
        }
    }

    // End game if all letters are correct
    if (correctPositions.length === WORD_LEN) {
        gameEnd = true;
        popup("Impressive!"); // Message for player
    }

    // Go to the next row
    currRow += 1;
    currCol = 0;
}

// Popup for alerting users on status
function popup(status) {
    const popup = document.getElementById("popup");
    popup.textContent = status;
    popup.className = "visibility";

    setTimeout(() => {
        popup.classList.remove("visibility");
    }, 2500);
}

window.onload = function() {
    startGame();
}