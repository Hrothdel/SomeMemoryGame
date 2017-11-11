function updateStats() {
    $('#moves').text(`Moves ${moves}`);
    $('#matches').text(`Matches ${matches}`);

    updateStarRating();
}

function padNumber(number) {
    return (number > 9 ? String(number) : '0' + String(number));
}

function getTimeElapsed() {
    let delta = Date.now() - start_time;

    return padNumber(Math.floor(delta/1000/60)) + ':' + padNumber(Math.floor((delta/1000))%60);
}

function updateTimer() {
    if(start_time !== undefined) {
        $('#timer').text(`Time ${getTimeElapsed()}`);
    }
}

function updateStarRating () {
    let star_images = '',
        active_star = '<img class="star" src="images/star-active.png">',
        inactive_star = '<img class="star" src="images/star-inactive.png">';

    $('#star-rating').children().remove();

    if(moves <= (optimal_moves + Math.ceil(optimal_moves * 0.75))) {
        star_images += active_star;
    } else {
        star_images += inactive_star;
    }

    if(moves <= (optimal_moves + Math.ceil(optimal_moves * 0.25))) {
        star_images += active_star;
    } else {
        star_images += inactive_star;
    }

    if(moves <= optimal_moves) {
        star_images += active_star;
    } else {
        star_images += inactive_star;
    }

    $('#star-rating').append(star_images);
}

function recalculateOptimalMoves() {
    optimal_moves = (width*height)/2 + Math.ceil((width*height)/4);
}

function showStats() {
    $('#stats-section').css('display', 'flex');
}
