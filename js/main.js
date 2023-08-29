let deckId
let computerScoreCount = 0
let myScoreCount = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const remainingCardsEL = document.getElementById("remaining-cards")
const computerScore = document.getElementById("computer-score")
const myScore = document.getElementById("my-score")
const header = document.getElementById("header")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainingCardsEL.textContent = `Remaining cards: ${data.remaining}`
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            remainingCardsEL.textContent = `Remaining cards: ${data.remaining}`
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScoreCount > myScoreCount) {
                    header.textContent = "The computer won the game!"
                }
                else if (computerScoreCount < myScoreCount) {
                    header.textContent = "You won the game!"
                }
                else {
                    header.textContent = "It's a tie game!"
                }
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScoreCount++
        computerScore.textContent = `Computer Score: ${computerScoreCount}`
        return "The Computer Wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScoreCount++
        myScore.textContent = `My Score: ${myScoreCount}`
        return "You won!"
    } else {
        return "War!"
    }
}