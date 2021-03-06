const content_section = $('#content');

const fade_time = 300,
    flip_time = 300,
    card_size = 150;

let width = 4,
    height = 4,
    cards = [],
    active = [],
    moves = 0,
    matches = 0,
    start_time = undefined,
    optimal_moves = 0,
    mid_rating_step = 5,
    low_rating_step = 15,
    shape_border_radius = 80;

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

function showButtons() {
    $('#buttons-section').css('display', 'flex');
}

function startGame() {
    initialize();

    showStats();
    showButtons();
    addGrid();

    recalculateOptimalMoves();
    updateStarRating();
};

function restartGame() {
    //Removing the whole grid, to have reinitialized all of the card objects
    $('#grid').remove();
    initialize();
    addGrid();

    //Update stats and timer, to show initial values
    updateStats();

    start_time = Date.now();
    updateTimer();
    start_time = undefined;
}

function win() {
    let win_time = getTimeElapsed();
    start_time = undefined;

    showWinScreen();
    $('#win-time').text(`Time ${win_time}`);
    $('#win-moves').text(`Moves ${moves}`);

    $('#win-stars').children().remove();
    $('#win-stars').append($('#star-rating').html());
}

function checkMatch(pair) {
    if(cards[pair[0]].content === cards[pair[1]].content) {
        matches++;
        updateStats();

        cards[pair[0]].match();
        cards[pair[1]].match();

        if(matches === width*height/2) {
            win();
        }
    } else {
        cards[pair[0]].hide();
        cards[pair[1]].hide();
    }

    cards[pair[0]].element.removeClass('active-card');
    cards[pair[1]].element.removeClass('active-card');
}

function showOptionsScreen() {
    $('#options-screen').css('display', 'flex');
    $('#options-screen').animate({opacity: 1}, fade_time);
}

function hideOptionsScreen() {
    $('#options-screen').animate({opacity: 0}, fade_time, function(){
        $('#options-screen').css('display', 'none');
    });
}

function showWinScreen(){
    $('#win-screen').css('display', 'flex');
    $('#win-screen').animate({opacity: 1}, fade_time);
}

function hideWinScreen() {
    $('#win-screen').animate({opacity: 0}, fade_time, function () {
        $('#win-screen').css('display', 'none');
    });
}

function changeCardShape(shape) {
    let radius = undefined;

    switch(shape) {
        case "square":
            radius = 0;
            break;
        case "rounded-square":
            radius = 20;
            break;
        case "circle":
            radius = 80;
            break;
    }

    shape_border_radius = radius;
}

content_section.click(function (event) {
    let index = Number($(event.target).attr('id')) - 1;

    if(!isNaN(index) && cards[index].is_hidden && active.length < 2) {
        cards[index].show();
        cards[index].element.addClass('active-card');
        active.push(index);

        if(start_time === undefined) {
            start_time = Date.now();
        }

        if(active.length === 2) {
            setTimeout(function () {
                checkMatch(active);
                active = [];
            }, flip_time);
        } else {
            moves++;
        }

        updateStats();
    }
});

start_button.click(function () {
    $('#start-screen').remove();

    startGame();
});

$('#reset-button').click(restartGame);

$('#options-button').click(showOptionsScreen);

$('#options-close-button').click(hideOptionsScreen);

$('#win-reset').click(function () {
    hideWinScreen();

    restartGame();
});

$('#options-form').submit(function (event) {
    event.preventDefault();
    height = $('#input-height').val();
    width = $('#input-width').val();

    changeCardShape($('input[name=shape]:checked').val());

    hideOptionsScreen();

    recalculateOptimalMoves();
    restartGame();
});

$(window).click(function (event) {
    if(event.target.id === 'options-screen') {
        hideOptionsScreen();
    }
});

setInterval(updateTimer, 500); /*Updating the timer about twice a second,
                               to avoid counter jumps caused by arbitrary lagging*/

//testing
$('#start-screen').remove();
$(startGame);
