const grid_container = $('#content');

const default_width = 4,
    default_height = 4;

let cards = [],
    active = [],
    matches = 0;

let start_button = $('#start-button'),
    grid;

function createGrid(height, width) {
    let current_content = 1;

    for(let i = 0; i < height; i++) {
        grid_container.append(`<tr class="grid-row"></tr>`);
        let row = grid_container.children().last();

        for(let j = 0; j < width; j++) {
            let index = (i*width) + (j+1);

            cards.push(new Card(index));
            cards[index-1].content = Math.floor(current_content);
            current_content += 0.5;
        }
    }
};

function shuffleCards(height, width) {
    let number_of_cards = height * width,
        number_of_pairs = number_of_cards / 2;

    for(let i = 0; i < number_of_cards; i++) {
        let swap_position = (Math.floor(Math.random() * (number_of_cards-i))) + i;

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

function checkMatch(pair) {
    if(cards[pair[0]].content === cards[pair[1]].content) {
        matches++;
    } else {
        cards[pair[0]].hide();
        cards[pair[1]].hide();
    }
}

grid_container.click(function (event) {
    let index = Number($(event.target).attr('id')) - 1;
    
    if(!isNaN(index)) {
        cards[index].show();
        active.push(index);

        if(active.length === 2) {
            checkMatch(active);
            active.pop();
            active.pop();
        }
    }
});

//testing
$('#start-screen').remove();
$(startGame);
//------
