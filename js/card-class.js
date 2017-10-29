let Card = function (number) {
    this.number = number;
};

Card.prototype.addTo = function(parent) {
    parent.append(`<tc class="card" id="${this.number}">${this.number}</tc>`)
};

Card.prototype.show = function() {
    $(`#${this.number}`).css('background-color', 'black');
};
