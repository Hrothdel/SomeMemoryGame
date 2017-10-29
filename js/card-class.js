let Card = function (position) {
    this.position = position;
    this.content = undefined;
};

Card.prototype.addTo = function(parent) {
    parent.append(`<tc class="card" id="${this.position}">${this.content}</tc>`)
};

Card.prototype.show = function() {
    $(`#${this.position}`).css('background-color', 'black');
};
