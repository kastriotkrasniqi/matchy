import { CardCollection } from '@/models/CardCollection'

export class CardController {
  constructor(matches = 6) {
    this.cardCollection = new CardCollection(matches)
    this.cards = this.cardCollection.cards;
    this.firstFlippedCard = null
    this.secondFlippedCard = null
    this.moves = 0
    this.win = false
  }

  flip(index) {
    if (
      this.isMatched(index) ||
      this.secondFlippedCard !== null ||
      this.firstFlippedCard === this.cards[index]
    )
      return

    const currentCard = this.cards[index]
    this.flipCard(currentCard)

    if (this.firstFlippedCard === null) {
      this.firstFlippedCard = currentCard
    } else {
      this.secondFlippedCard = currentCard
      this.checkMatch()
      this.moves++
    }
  }

  isMatched(index) {
    return this.cards[index].matched
  }

  flipCard(card) {
    card.flipped = !card.flipped
  }

  checkMatch() {
    setTimeout(() => {
      const { firstFlippedCard, secondFlippedCard } = this
      if (firstFlippedCard.image === secondFlippedCard.image) {
        this.setMatched(firstFlippedCard)
        this.setMatched(secondFlippedCard)
      } else {
        this.resetFlip(firstFlippedCard)
        this.resetFlip(secondFlippedCard)
      }
      this.resetCards()
      if (this.allMatched()) {
        this.win = true
      }
    }, 750)
  }

  setMatched(card) {
    card.matched = true
  }

  resetFlip(card) {
    card.flipped = false
  }

  resetCards() {
    this.firstFlippedCard = null
    this.secondFlippedCard = null
  }

  allMatched() {
    return this.cards.every((card) => card.matched)
  }
}
