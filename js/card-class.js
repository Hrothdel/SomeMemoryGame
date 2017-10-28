let Card = function (number) {
    this.number = number;
};

Card.prototype.addTo = function(parent) {
    parent.append(`<tc class="card">${this.number}</tc>`)
};
