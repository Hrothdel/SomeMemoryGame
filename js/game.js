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
    updateStarRating(); //To show the star rating from the start
};

function restartGame() {
    //Removing the whole grid, to have reinitialized all of the card objects
    $('#grid').remove();
    initialize();
    addGrid();

    //Update stats and timer, to show initial values
    updateStats();

    start_time = Date.now(); //A quite hacky way to display the initial value of the timer
    updateTimer();
    start_time = undefined; //Stop the timer so that it only starts on the first move after the restart
}

function win() {
    let win_time = getTimeElapsed();
    start_time = undefined; //To stop the timer while the win-screen is displayed

    showWinScreen();
    $('#win-time').text(`Time ${win_time}`);
    $('#win-moves').text(`Moves ${moves}`);

    $('#win-stars').children().remove(); //Remove the old win star rating (if it exists),
                                         //to add the new one
    $('#win-stars').append($('#star-rating').html());
}

function checkMatch(pair) {
    if(cards[pair[0]].content === cards[pair[1]].content) {
        matches++;
        updateStats();

        cards[pair[0]].match(); //If the cards match, a visual clue is displayed
        cards[pair[1]].match();

        if(matches === width*height/2) { //If the number of matches equals the number of
                                         //pairs(the total number of cards devided by 2),
                                         //the game is won
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
        $('#options-screen').css('display', 'none'); //Only hide the element completely when the fading ends
    });
}

function showWinScreen(){
    $('#win-screen').css('display', 'flex');
    $('#win-screen').animate({opacity: 1}, fade_time);
}

function hideWinScreen() {
    $('#win-screen').animate({opacity: 0}, fade_time, function () {
        $('#win-screen').css('display', 'none'); //Same as above
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

    if(!isNaN(index) && cards[index].is_hidden && active.length < 2) { //Only if the clicked element has an index (meaning
                                                                       //it's a card), it is currently hidden and there
                                                                       //aren't already two active cards, then show the
                                                                       //clicked card
        cards[index].show();
        cards[index].element.addClass('active-card'); //Add the active-card class to disable the hover effects of the
                                                      //hidden cards
        active.push(index);

        if(start_time === undefined) { //If the timer isn't already active, start it
            start_time = Date.now();
        }

        if(active.length === 2) { //If there are two active cards, check if they match
            setTimeout(function () { //Wait until the show animation ends, and only then check if the cards match
                checkMatch(active);
                setTimeout(function () {active = [];}, flip_time*2);
            }, flip_time);
        } else { //Add to the moves counter only on the first clicked card for each pair of two
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
    restartGame(); //The game must restart for the changes to have an effect
});

$(window).click(function (event) {
    if(event.target.id === 'options-screen') { //Hide the options screen on a click outside its content zone
        hideOptionsScreen();
    }
});

setInterval(updateTimer, 500); /*Updating the timer about twice a second,
                               to avoid counter jumps caused by arbitrary lagging*/

//testing
$('#start-screen').remove();
$(startGame);
