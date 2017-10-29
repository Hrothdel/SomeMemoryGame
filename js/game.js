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
            cards[index-1].content = index + (index%2) - 1;
            //cards[index-1].addTo(row);
        }
    }
};

function shuffleCards(height, width) {
    let number_of_cards = height * width,
        number_of_pairs = number_of_cards / 2;

    for(let i = 0; i < number_of_cards; i++) {
        let swap_position = (Math.floor(Math.random() * (number_of_cards-i))) + i;

        console.log(swap_position);
        let aux = cards[i].content;
        cards[i].content = cards[swap_position].content;
        cards[swap_position].content = aux;
    }
}

function showGrid(height, width) {
    let number_of_cards = height * width,
        index = 0;

    grid_container.children().each( function () {
        for(let i = 0; i < width; i++) {
            cards[index].addTo($(this));
            index++;
        }
    });
}

function startGame() {
    createGrid(default_height, default_width);
    shuffleCards(default_height, default_width);
    showGrid(default_height, default_width);
};

start_button.click(function () {
    $('#start-screen').remove();

    startGame();
});

grid_container.click(function (event) {
    let index = $(event.target).attr('id');
    if(index !== undefined) {
        cards[Number($(event.target).attr('id'))-1].show();
    }
});

//testing
$('#start-screen').remove();
$(startGame);
//------
