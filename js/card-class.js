let Card = function (position) {
    this.position = position;

    this.content = undefined;
    this.is_hidden = true;
};

Card.prototype.addTo = function (parent) {
    parent.append(`<tc class="card" id="${this.position}">${this.content}</tc>`)
};

Card.prototype.show = function () {
    $(`#${this.position}`).css('background-color', 'black');

    this.is_hidden = false;
};

Card.prototype.hide = function () {

    setTimeout(function () {
        $(`#${this.position}`).css('background-color', 'white');
    }.bind(this), 1000);
    this.is_hidden = true;
};
