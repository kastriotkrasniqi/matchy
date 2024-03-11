import { Card } from './Card.js';

export class CardCollection {
    constructor(matches = 6) {
        this.matches = matches;
        this.cards = this.getCards();
    }

    getCards() {
        let generatedNumbers = [];
        let generatedCards = [];

        while (generatedNumbers.length < this.matches) {
            let randomNumber = Math.floor(Math.random() * 15) + 1;

            if (!generatedNumbers.includes(randomNumber)) {
                let cardOne = new Card();
                let cardTwo = new Card();

                cardOne.image = `/cards/${randomNumber}.jpg`;
                cardTwo.image = `/cards/${randomNumber}.jpg`;

                generatedCards.push(cardOne, cardTwo);
                generatedNumbers.push(randomNumber);
            }
        }

        generatedCards.sort(() => Math.random() - 0.5);

        return generatedCards ;
    }
}


