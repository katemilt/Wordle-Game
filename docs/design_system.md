# Documenting the Design

## Fonts/Sizes:
- All text is presented in Arial, sans-serif and bolded.
- The text in the letter boxes is 20px (except for the ENTER button which is 12px).

## Colour Palette:
- For the letter boxes and keyboard buttons, 3 colours were used to distinguish between the correctness of the user's guesses: #53beab (turqoise) for correctly placed letters, #df97c4 (pink) for letters that are not placed correctly, and #6b6b6b (grey) for letters that are not in the solution.
- For the letter boxes themselves, #d1ced0 (light grey) was used for the borders.
- This same colour, #d1ced0, was also used for the borders around the keyboard buttons.
- The background colour is a slightly off white colour, #f7f9f2.
- All text is in black, except for when the user makes guesses and the box/keyboard button colours change, then the text becomes white so that it can be seen.
![alt text](./design_system/colourpalette.png "Colour Palette")

## Major Game Components:

### Starting a Game
- Upon opening the window, the user sees all empty boxes (with no colour) and all of the keyboard buttons have no colour yet.

### In Game Play
- As the user starts making guesses, the letter boxes and keyboard buttons will change colours depending on the correctness of their guesses, as explained in the colour palette section.

### End of Game Scenarios
Win

Lose