let Card = function (position) {
    this.position = position;
    this.element = undefined;

    this.content = undefined;
    this.is_hidden = true;
};

Card.prototype.addTo = function (parent) {
    parent.append(`<tc class="card" id="${this.position}"></tc>`)
    this.element = $(`#${this.position}`);
};

Card.prototype.show = function () {
    this.is_hidden = false;

    this.element.css('background-color', 'black');
    this.element.text(String(this.content));

};

Card.prototype.hide = function () {
    this.is_hidden = true;

    setTimeout(function () {
        this.element.css('background-color', 'white');
        this.element.text('');
    }.bind(this), 1000);
};
