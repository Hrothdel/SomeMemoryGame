let Card = function (position) {
    this.position = position;
    this.element = undefined;

    this.content = undefined;
    this.is_hidden = true;
};

Card.prototype.addTo = function (parent) { //Add a html element to the DOM, with properties corresponding with
                                           //the object's fileds, as a child of the passed element
    parent.append(`<tc class="card" id="${this.position}"><img class="card-image" id="${this.position}-img"></tc>`);

    this.element = $(`#${this.position}`); //Storing the object's corresponding html element to refer to it more easily
};

Card.prototype.bindImage = function (number) { //Bind an image to the object's html element,
                                               //corresponding with the passed number
    $(`#${this.position}-img`).attr('src', `images/numbers/${number}.png`);
    $(`#${this.position}-img`).css('display', 'none');
}

Card.prototype.show = function () {
    this.is_hidden = false;

    this.element.animate({width: 0, margin: '0 85'}, flip_time/2, function () { //Basic flip animation, made in two steps
                                                                                //(reducing the hidden card's width to 0,
                                                                                //and then showing it's other side while
                                                                                //changing it's width back to normal)
        this.element.css('background-color', 'black');
        $(`#${this.position}-img`).css('display', 'inline');

        this.element.animate({width: card_size, margin: '10'}, flip_time/2);
    }.bind(this));
};

Card.prototype.hide = function () {
    setTimeout(function () {
        this.is_hidden = true;

        this.element.animate({width: 0, margin: '10 85'}, flip_time/2, function () { //Same animation, only this time changing
                                                                                     //the card to hidden
            this.element.css('background-color', 'white');
            $(`#${this.position}-img`).css('display', 'none');

            this.element.animate({width: card_size, margin: '10'}, flip_time/2);
        }.bind(this));
    }.bind(this), 500);
};

Card.prototype.match = function () { //Add visual clues to matched pairs
    this.element.addClass('matched-card'); //Adding the matched-card for the color change to have a transition
    this.element.css('background-color', '#3f1');
}
