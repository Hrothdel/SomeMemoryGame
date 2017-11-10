function createGrid() {
    let current_content = 1; //The value placed in each card

    content_section.append('<section id="grid"></section>');
    grid_container = $('#grid'); //Placing the grid element in a variable, to avoid searching the DOM needlessly

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

function addDynamicStyling() { //Only for the shape of the cards (that can be changed on the options screen)
    $('.card').css('border-radius', `${shape_border_radius}px`);
}

function bindCardImages() { //Bind to each card the immage corresponding to their content value
    let number_of_cards = height * width;

    for(let i = 0; i < number_of_cards; i++) {
        cards[i].bindImage(cards[i].content);
    }
}

function shuffleCards() {
    let number_of_cards = height * width;

    for(let i = 0; i < number_of_cards; i++) { //Iterate through all of the cards, swapping the content of each
                                               //with the content of another randomly chosen card
        let swap_position = (Math.floor(Math.random() * (number_of_cards-i))) + i; //Picking the swap positoin only from
                                                                                   //the cards that are in front of the
                                                                                   //current one (that's why i is subtracted
                                                                                   //from the possible positions and then added
                                                                                   //to the random result)
        let aux = cards[i].content; //Basic swapping method
        cards[i].content = cards[swap_position].content;
        cards[swap_position].content = aux;
    }
}

function addGridElements() { //Add the actual cards to the DOM
    let number_of_cards = height * width,
        index = 0;

    grid_container.children().each( function () { //For each row of the grid, add the number of cards (as cells)
                                                  //corresponding with the current grid width
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
    addDynamicStyling(); //For the properties that can be changed in the settings
    bindCardImages();
}
