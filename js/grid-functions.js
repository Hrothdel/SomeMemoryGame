function createGrid() {
    let current_content = 1;
    content_section.append('<section id="grid"></section>');
    grid_container = $('#grid');

    for(let i = 0; i < height; i++) {
        grid_container.append(`<tr class="grid-row"></tr>`);
        let row = grid_container.children().last();

        for(let j = 0; j < width; j++) {
            let index = (i*width) + (j+1);

            cards.push(new Card(index));
            cards[index-1].content = Math.floor(current_content);
            current_content += 0.5; //To initially place the values in equal pairs
        }
    }
};

function bindCardImages() {
    let number_of_cards = height * width;

    for(let i = 0; i < number_of_cards; i++) {
        cards[i].bindImage(cards[i].content);
    }
}

function shuffleCards() {
    let number_of_cards = height * width;

    for(let i = 0; i < number_of_cards; i++) {
        let swap_position = (Math.floor(Math.random() * (number_of_cards-i))) + i;

        let aux = cards[i].content;
        cards[i].content = cards[swap_position].content;
        cards[swap_position].content = aux;
    }
}

function addGridElements() {
    let number_of_cards = height * width,
        index = 0;

    grid_container.children().each( function () {
        for(let i = 0; i < width; i++) {
            cards[index].addTo($(this));
            index++;
        }
    });
}

function addGrid() {
    createGrid();
    shuffleCards();
    addGridElements();
    bindCardImages();
}
