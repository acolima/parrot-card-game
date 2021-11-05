let numberOfCards = prompt("Digite o número de cartas (de 2 a 14)");
const parrots = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
const sortedParrots = [];

let numberOfMoves = 0;
let turnedCards = 0;
let pairsGuessed = 0;

// Verifica se a quantidade de cartas é válida
while (numberOfCards % 2 !== 0 || numberOfCards > 14 || numberOfCards <= 0) {
  numberOfCards = prompt(
    "Esse não é um número válido. \n Digite o número de cartas"
  );
}

// Embaralha o Array de Papagaios
function sortParrots(){
    parrots.sort(sortElements);

    for(let i = 0; i < numberOfCards / 2; i++){
        sortedParrots.push(parrots[i]);
        sortedParrots.push(parrots[i]);
    }
    sortedParrots.sort(sortElements);
}

// Embaralha os elementos do Array
function sortElements() {
    return Math.random() - 0.5;
}

sortParrots();

// Cria tela para o jogo
function createGame() {
    const top = document.querySelector(".top-row");
    const bottom = document.querySelector(".bottom-row");

    for (let i = 0; i < sortedParrots.length / 2; i++) {
        top.innerHTML += `
        <li class = "card" onclick="flipCard(this)">
            <div class="face front-face" data-identifier="front-face">
                <img class="gif" src="../assets/${sortedParrots[i]}.gif"/>
                <span>${sortedParrots[i]}</span>
            </div>
            <div class="face back-face" data-identifier="back-face">
                <img src="../assets/front.png"/>
            </div>
        </li>`;
    }

    for (let j = sortedParrots.length / 2; j < sortedParrots.length; j++) {
        bottom.innerHTML += `
        <li class = "card" onclick="flipCard(this)">
            <div class="face front-face face" data-identifier="front-face">
                <img class="gif" src="../assets/${sortedParrots[j]}.gif"/>
                <span>${sortedParrots[j]}</span>
            </div>
            <div class="face back-face face" data-identifier="back-face">
                <img src="../assets/front.png"/>
            </div>
        </li>`;
    }
}
createGame();

// Variáveis que representam as cartas selecionadas
let card1 = null, card2 = null;

// Vira uma carta
function flipCard(card) {
    numberOfMoves++;
    const cardFrontFace = card.children[0];
    const cardBackFace = card.children[1];

    if(card1 === null) card1 = card;
    else card2 = card;

    cardFrontFace.classList.add("turnFront");
    cardBackFace.classList.add("turnBack");
    card.classList.add("selected");
    turnedCards++;
    
    checkPair();
}

// Checa um par de cartas
function checkPair(){
    if(turnedCards === 2){
        const parrot1 = card1.querySelector("span");
        const parrot2 = card2.querySelector("span");
    
        if(parrot1.innerHTML === parrot2.innerHTML){
            card1.classList.remove("selected");
            card2.classList.remove("selected");
            card1.classList.add("guessed");
            card2.classList.add("guessed");
            pairsGuessed++;
        } else {
            unflipCard();
        }
        turnedCards = 0;
        card1 = null;   
    }
    checkEndGame();
}

// Desvira uma carta
function unflipCard() {
    const cards = document.querySelectorAll(".selected");

    setTimeout(() => {
        for(let i = 0; i < cards.length; i++){
            let cardFrontFace = cards[i].children[0];
            let cardBackFace = cards[i].children[1];

            cards[i].classList.remove("selected");
            cardFrontFace.classList.remove("turnFront");
            cardBackFace.classList.remove("turnBack");
        }
    }, 1000);

}

// Verifica se todos os pares foram encontrados
function checkEndGame() {
    if(pairsGuessed === numberOfCards/2){
        alert("Você terminou em " + numberOfMoves+" jogadas");
    }
}