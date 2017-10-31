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
    setTimeout(function () {
        this.is_hidden = true;
        this.element.css('background-color', 'white');
        this.element.text('');
    }.bind(this), 500);
};

Card.prototype.match = function () {
    this.element.css('background-color', '#3f1');
}
