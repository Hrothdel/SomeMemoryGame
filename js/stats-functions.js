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
    }
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

function recalculateOptimalMoves() {
    optimal_moves = (width*height)/2 + Math.ceil((width*height)/4);
}

function addStats() {
    $('#stats-section').css('display', 'flex');
}
