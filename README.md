# Some memory game
A simple memory game, the objective of witch is to find all the pairs of matching cards as efficiently as possible.

This is quite a small project that I've been assigned as a part of an online course on web development. As such, my main goal was to learn as much as possible, without needlessly overcomplicating things, so it might be a little bare-bones.

## How to play
At the start of the game, you are given a grid of cards with their content hidden. By clicking on a card, you can reveal it, and it will be shown until you flip another one. Then, if the pair of cards you have selected match (if they have the same number of them) they will remain shown, and they will turn green, to indicate their matched state. The goal is to match all the pairs of cards, a victory screen being shown at the end.

## The star rating
As you play, you will be automatically rated on how well you do, 3 golden stars indicating the best result. This rating, being calculated while the game takes place, will start having all 3 stars already golden, their number decreasing only if you make more than the optimal number of moves.

To clarify, a move is counted as the flipping of a single pair of cards, so each two clicks on a hidden card will count as a move.

## Running the game
In case you are unfamiliar with GitHub, or with web-apps, just follow these steps:

1. Click the green "Clone or download" button, and chose "Download ZIP".
2. Extract the files anywhere on your drive.
3. Find the "index.html" file just inside the extracted folder, and run it using your browser.
