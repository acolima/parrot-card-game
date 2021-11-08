let numberOfCards = prompt("Digite o número de cartas (de 4 a 14)");
const parrots = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
const sortedParrots = [];

let numberOfMoves = 0;
let turnedCards = 0;
let pairsGuessed = 0;

let endGame = false;
let endTimer = 0;

endTimer = setInterval(timer, 1000);

// Verifica se a quantidade de cartas é válida
while (numberOfCards % 2 !== 0 || numberOfCards > 14 || numberOfCards < 4) {
  numberOfCards = prompt(
    "Esse não é um número válido. \n Digite o número de cartas (de 4 a 14)"
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

// Cria tela para o jogo
function createGame() {
    sortParrots();

    const top = document.querySelector(".top-row");
    const bottom = document.querySelector(".bottom-row");

    for (let i = 0; i < sortedParrots.length / 2; i++) {
        top.innerHTML += `
        <li class = "card" onclick="flipCard(this)" data-identifier="card">
            <div class="face front-face" data-identifier="front-face">
                <img class="gif" src="../assets/${sortedParrots[i]}.gif" alt="Imagem animada (gif) de um papagaio, peça do jogo"/>
                <span>${sortedParrots[i]}</span>
            </div>
            <div class="face back-face" data-identifier="back-face">
                <img src="../assets/front.png" alt="Imagem de um papagaio, parte de trás da carta do jogo"/>
            </div>
        </li>`;
    }

    for (let j = sortedParrots.length / 2; j < sortedParrots.length; j++) {
        bottom.innerHTML += `
        <li class = "card" onclick="flipCard(this)" data-identifier="card">
            <div class="face front-face face" data-identifier="front-face">
                <img class="gif" src="../assets/${sortedParrots[j]}.gif" alt="Imagem animada (gif) de um papagaio, parte da frente da carta do jogo"/>
                <span>${sortedParrots[j]}</span>
            </div>
            <div class="face back-face face" data-identifier="back-face">
                <img src="../assets/front.png" alt="Imagem de um papagaio, parte de trás da carta do jogo"/>
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

    cardFrontFace.classList.add("turn-front");
    cardBackFace.classList.add("turn-back");
    card.classList.add("block-turn");
    turnedCards++;
    
    checkPair();
}

// Checa um par de cartas
function checkPair(){
    if(turnedCards === 2){
        const parrot1 = card1.querySelector("span");
        const parrot2 = card2.querySelector("span");
    
        const notGuessed = document.querySelectorAll("li:not(.guessed)");
        for(let i = 0; i < notGuessed.length; i++)
            notGuessed[i].classList.add("block-turn");

        if(parrot1.innerHTML === parrot2.innerHTML){
            card1.classList.add("guessed");
            card2.classList.add("guessed");
            pairsGuessed++;
        } else {
            setTimeout(unflipCard, 1000, card1);
            setTimeout(unflipCard, 1000, card2);
        }
        turnedCards = 0;
        card1 = null;   
        setTimeout(() => {
            for(let i = 0; i < notGuessed.length; i++)
                notGuessed[i].classList.remove("block-turn");
        }, 1000);

        setTimeout(checkEndGame, 500);
    }
}

// Desvira uma carta
function unflipCard(card) {
    const cardFrontFace = card.children[0];
    const cardBackFace = card.children[1];

    card.classList.remove("block-turn");
    cardFrontFace.classList.remove("turn-front");
    cardBackFace.classList.remove("turn-back");
}

// Verifica se todos os pares foram encontrados
function checkEndGame() {
    if(pairsGuessed === numberOfCards/2){
        endGame = true;
        alert(`Você ganhou em ${numberOfMoves} jogadas e ${m}m${s}s`);
        const reload = prompt("Deseja jogar novamente? Digite 'sim' ou 'não'");
        if (reload === "sim")
            document.location.reload(true);
    }
}

const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

let s = 0;
let m = 0;
function timer() {
    s++; 
    
    if (s < 10)
        seconds.innerHTML = `0${s}`;
    else seconds.innerHTML = s;

    if (m < 10)
    minutes.innerHTML = `0${m}`;
    else minutes.innerHTML = m;
    
    if(s === 59){
        m++; s = -1;
    }

    if(endGame)
        clearInterval(endTimer);
}