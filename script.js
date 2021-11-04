const numberOfCards = prompt("Digite o número de cartas");
const parrots = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
const sortedParrots = [];

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

function createGame() {
    const top = document.querySelector(".top-row");
    const bottom = document.querySelector(".bottom-row");

    for (let i = 0; i < sortedParrots.length / 2; i++) {
        top.innerHTML += `<li class = "card">
            <div class="back-face" data-identifier="back-face"></div>
            <div class="front-face" data-identifier="front-face">
                <img src="../assets/${sortedParrots[i]}"/> 
            </div>
        </li>`;
    }

    for (let j = sortedParrots.length / 2; j < sortedParrots.length; j++) {
        bottom.innerHTML += `<li class = "card">
            <div class="back-face face" data-identifier="back-face"></div>
            <div class="front-face face" data-identifier="front-face">
                <img src="../assets/${sortedParrots[j]}"/> 
            </div>
        </li>`;
    }
}

createGame();






