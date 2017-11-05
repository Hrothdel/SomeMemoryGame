const content_section = $('#content');

let width = 4,
    height = 4,
    cards = [],
    active = [],
    moves = 0,
    matches = 0,
    start_time = undefined,
    optimal_moves = 0,
    mid_rating_step = 5,
    low_rating_step = 15;

let start_button = $('#start-button'),
    grid_container,
    stats_section;

function initialize() {
    cards = [];
    active = [];
    moves = 0;
    matches = 0;

    start_time = undefined;
}

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
            current_content += 0.5; //To initially place values in equal pairs
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

function updateStarRating () {
    $('#star-rating').children().remove();

    let star_images = "";
    if(moves <= (optimal_moves + Math.ceil(optimal_moves * 0.75))) {
        star_images += '<img class="star" src="images/star-active.png">';
    } else {
        star_images += '<img class="star" src="images/star-inactive.png">';
    }

    if(moves <= (optimal_moves + Math.ceil(optimal_moves * 0.25))) {
        star_images += '<img class="star" src="images/star-active.png">';
    } else {
        star_images += '<img class="star" src="images/star-inactive.png">';
    }

    if(moves <= optimal_moves) {
        star_images += '<img class="star" src="images/star-active.png">';
    } else {
        star_images += '<img class="star" src="images/star-inactive.png">';
    }

    $('#star-rating').append(star_images);
}

function addStats() {
    $('#stats-section').css('display', 'flex');
}

function addButtons() {
    $('#buttons-section').css('display', 'flex');
}

function addGrid() {
    createGrid(height, width);
    shuffleCards(height, width);
    showGrid(height, width);
}

function recalculateOptimalMoves() {
    optimal_moves = (width*height)/2 + Math.ceil((width*height)/4);
}

function startGame() {
    initialize();

    addStats();
    addButtons();
    addGrid();

    recalculateOptimalMoves();
    updateStarRating();
};

function restart() {
    //Removing the whole grid, to have reinitialized all of the card objects
    $('#grid').remove();
    initialize();
    addGrid();

    //Update stats and timer, to show initial values
    updateStats();
    updateTimer();
}

function win() {
    let win_time = getTimeElapsed();

    $('#win-screen').css('display', 'block');
    $('#win-time').text(`Time: ${win_time}`);
    $('#win-moves').text(`Moves: ${moves}`);
}

function checkMatch(pair) {
    if(cards[pair[0]].content === cards[pair[1]].content) {
        matches++;
        moves++;
        cards[pair[0]].match();
        cards[pair[1]].match();

        if(matches === width*height/2) {
            win();
        }
    } else {
        moves++;
        cards[pair[0]].hide();
        cards[pair[1]].hide();
    }
}

function updateStats() {
    $('#moves').text(`Moves: ${moves}`);
    $('#matches').text(`Matches: ${matches}`);

    updateStarRating();
}

function pad(number) {
    return (number > 9 ? String(number) : '0' + String(number));
}

function getTimeElapsed() {
    let delta = Date.now() - start_time;

    return pad(Math.floor(delta/1000/60)) + '-' + pad(Math.floor((delta/1000))%60);
}

function updateTimer() {
    if(start_time !== undefined) {
        $('#timer').text(`Time: ${getTimeElapsed()}`);
    } else {
        $('#timer').text('Time: 00-00'); //For the updates after a reset
    }
}

function showOptions() {
    $('#options-screen').css('display', 'block');
}

function hideOptionsScreen() {
    $('#options-screen').css('display', 'none');
}

content_section.click(function (event) {
    let index = Number($(event.target).attr('id')) - 1;

    if(!isNaN(index) && cards[index].is_hidden) {
        cards[index].show();
        active.push(index);

        if(start_time === undefined) {
            start_time = Date.now();
        }

        if(active.length === 2) {
            checkMatch(active);

            active = [];
        }

        updateStats();
    }
});

start_button.click(function () {
    $('#start-screen').remove();

    startGame();
});

$('#reset-button').click(restart);

$('#options-button').click(showOptions);

$('#options-close-button').click(hideOptionsScreen);

$('#win-reset').click(function () {
    $('#win-screen').css('display', 'none');

    restart();
});

$('#options-form').submit(function (event) {
    event.preventDefault();
    height = $('#input-height').val();
    width = $('#input-width').val();

    hideOptionsScreen();

    recalculateOptimalMoves();
    restart();
});

setInterval(updateTimer, 500); //updating timer about twice a second,
                                //to avoid counter jumps caused by arbitrary lagging

//testing
$('#start-screen').remove();
$(startGame);
//------
