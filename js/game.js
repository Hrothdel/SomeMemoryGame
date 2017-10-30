const content_section = $('#content');

const default_width = 4,
    default_height = 4;

let cards = [],
    active = [],
    moves = 0,
    matches = 0;

let start_button = $('#start-button'),
    grid_container,
    stats_section;

function createGrid(height, width) {
    let current_content = 1;
    content_section.append('<section id="grid"></section>');
    grid_container = $('#grid');

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

function addStats() {
    content_section.append('<section id="stats-section"></section>');
    stats_section = $('#stats-section');

    stats_section.append('<span id="moves" class="stats">Moves: 0</span>');
    stats_section.append('<span id="matches" class="stats">Matches: 0</span>');
}

function startGame() {
    addStats();
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

function updateStats() {
    $('#moves').text(`Moves: ${moves}`);
    $('#matches').text(`Matches: ${matches}`);
}

content_section.click(function (event) {
    let index = Number($(event.target).attr('id')) - 1;

    if(!isNaN(index) && cards[index].is_hidden) {
        cards[index].show();
        active.push(index);
        moves++;

        if(active.length === 2) {
            checkMatch(active);
            active.pop();
            active.pop();
        }

        updateStats();
    }
});

//testing
$('#start-screen').remove();
$(startGame);
//------
