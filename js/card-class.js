let Card = function (position) {
    this.position = position;
    this.element = undefined;

    this.content = undefined;
    this.is_hidden = true;
};

Card.prototype.addTo = function (parent) {
    parent.append(`<tc class="card" id="${this.position}"><img class="card-image" id="${this.position}-img"></tc>`);

    this.element = $(`#${this.position}`);
};

Card.prototype.bindImage = function (number) {
    $(`#${this.position}-img`).attr('src', `images/numbers/${number}.png`);
    $(`#${this.position}-img`).css('display', 'none');
}

Card.prototype.show = function () {
    this.is_hidden = false;

    this.element.animate({width: 0, margin: '0 85'}, flip_time/2, function () {
        this.element.css('background-color', 'black');
        $(`#${this.position}-img`).css('display', 'inline');

        this.element.animate({width: card_size, margin: '10'}, flip_time/2);
    }.bind(this));
};

Card.prototype.hide = function () {
    setTimeout(function () {
        this.is_hidden = true;

        this.element.animate({width: 0, margin: '10 85'}, flip_time/2, function () {
            this.element.css('background-color', 'white');
            $(`#${this.position}-img`).css('display', 'none');

            this.element.animate({width: card_size, margin: '10'}, flip_time/2);
        }.bind(this));
    }.bind(this), 500);
};

Card.prototype.match = function () {
    this.element.addClass('matched-card');
    this.element.css('background-color', '#3f1');
}
