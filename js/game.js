const grid_container = $('#content');

const default_width = 5,
    default_height = 4;

let cards = [];

let start_button = $('#start-button'),
    grid;

function createGrid(height, width) {

    for(let i = 0; i < height; i++) {
        grid_container.append(`<tr class="grid-row"></tr>`);
        let row = grid_container.children().last();

        for(let j = 0; j < width; j++) {
            let index = (i*width) + (j+1);
            
            cards.push(new Card(index));
            cards[index-1].addTo(row);
        }
    }
};

function startGame() {
    createGrid(default_height, default_width);
};

start_button.click(function () {
    $('#start-screen').remove();

    startGame();
});
