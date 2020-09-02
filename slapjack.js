let cards =[]
let playerCards = []
let opponentCards = []
const body = document.querySelector("body")
const gamePile = document.getElementById('discard-pile')
const playerDeck = document.getElementById("player-deck")
const dialogue = document.querySelector(".win-lose-wrapper")
const header = document.getElementById("win-lose-status")
playerDeck.setAttribute("draggable","true")

for(let i = 0 ; i < 4; i++){
    let suit =''
    switch(i){
        case 0 : suit = 'H'
                break
        case 1 : suit = 'D'
                break
        case 2 : suit = 'S'
                break
        case 3 : suit = 'C'
                break
    }
    for(let j = 0 ; j < 13 ; j++){
        if(j===0)
          cards.push('A'+suit)
        else if(j===10)
          cards.push('J' + suit)
        else if(j===11)
            cards.push('Q' + suit)
        else if(j===12)
            cards.push('K' + suit)
        else
            cards.push(j + suit)
    }
}

function shuffle(deck){
    let currentCard = deck.length
    let random
    let temp
    while(currentCard !==0){
        random = Math.floor(Math.random()*currentCard)
        currentCard -= 1
        temp = deck[currentCard]
        deck[currentCard] = deck[random]
        deck[random] = temp
   }
   return deck;
}
cards = shuffle(cards)
console.log(cards)

function distributeCards(deck){
    for(let i = 0 ; i < deck.length ; i++){
        if(i%2===0)
            playerCards.push(deck[i])
        else
           opponentCards.push(deck[i])
    }
}
distributeCards(cards)
console.log(playerCards)
console.log(opponentCards)
cards = []
function playGame(event){
    const cardArt = document.getElementById("card-art")
    const cardNumber = document.getElementsByClassName("number")
    let suitSymbol = ''
    let currentCard
    let target = event.target.id
    if( target === "player-deck"){
        currentCard = playerCards[0]
        playerCards.splice(0,1)

    }
    else{
        currentCard = opponentCards[0]
        opponentCards.splice(0,1)

    }
    
    cards.unshift(currentCard)
    let currentValue = currentCard.substring(0,1)
    if(Number(currentValue)){
        currentValue = Number(currentValue) + 1
    }
    let sign = currentCard.substring(1,2)
    gamePile.classList.remove('red')

    for(let i=0;i<2;i++){
        switch(sign){
            case 'H' :cardNumber[i].innerText = currentValue + "\n♥️"
                      suitSymbol = '♥️'
                      gamePile.classList.add('red')
                      break
            case 'D' :cardNumber[i].innerText = currentValue + "\n♦️"
                      suitSymbol = '♦️'
                      gamePile.classList.add('red')
                      break
            case 'S' :cardNumber[i].innerText = currentValue + "\n♠️"
                      suitSymbol = '♠️'
                      break
            case 'C' :cardNumber[i].innerText = currentValue + "\n♣️"
                      suitSymbol = '♣️'
                      break
        }
        
    }
    while(cardArt.children[0]){
        cardArt.children[0].remove()
    }
   
    if(Number(currentValue)){
        if(currentValue < 4 ){
            cardArt.style.flexFlow = "column wrap"
        }
        else
        cardArt.style.flexFlow = "row wrap"
        for(let i=0;i<currentValue;i++){
            let suit = document.createElement('div')
            suit.textContent = suitSymbol
            cardArt.appendChild(suit)
        }
    }
    else{
        let suit = document.createElement('div')
        if(currentValue==='A'){
            suit.textContent = 'A'
            cardArt.appendChild(suit)
        }
      else if(currentValue === 'J'){
        suit.textContent = '🧙‍♂️'
        cardArt.appendChild(suit)
      }
      else if(currentValue==='Q'){
        suit.textContent = '👸'
        cardArt.appendChild(suit)
      }
      else if(currentValue==='K'){
        suit.textContent = '🤴'
        cardArt.appendChild(suit)
      }
      else 
       console.log("invalid Game")
        
    }
    gameWinner()
    console.log(playerCards)
    opponentAI(target)

}
let reaction

function opponentAI(lastPlayer){
    const reactionTime = Math.floor(500 + (Math.random() * 500))
    window.clearTimeout(reaction)
    reaction = window.setTimeout(() => {
      if(cards.length > 0 && cards[0].includes('J'))
        slap()
      else if(lastPlayer === "player-deck"){
        let event = new Object
        event.target = new Object
        event.target.id = "opponent-deck"
        playGame(event)
    }
    },reactionTime)

}
function slap(event){
    let length = cards.length
    if(event !== undefined){
        currentPlayer = "player" 
    }
    else 
        currentPlayer = "computer"
    if(length > 0 && cards[0].includes('J')){
        if(currentPlayer === "player"){
           playerCards = playerCards.concat(shuffle(cards))
           window.clearTimeout(reaction)
        }
        else if(currentPlayer === "computer"){
            opponentCards = opponentCards.concat(shuffle(cards))
            opponentAI("player-deck")
        }
    }
    gameWinner()
}
function gameWinner(){
    if(playerCards.length === 0){
        console.log("entered")
        window.clearTimeout(reaction)
        playerDeck.removeEventListener('click',playGame)
        header.textContent = "Opponent Wins"
        dialogue.style.visibility = "visible"
        dialogue.classList.add("animate")
    }
    else if(opponentCards.length === 0){
        window.clearTimeout(reaction)
        playerDeck.removeEventListener('click',playGame)
        header.textContent = "You Win"
        dialogue.style.visibility = "visible"
        dialogue.classList.add("animate")
    }
}
playerDeck.addEventListener('click', playGame)
gamePile.addEventListener('click', slap)
