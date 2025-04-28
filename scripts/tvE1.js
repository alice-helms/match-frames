const images = [
    'images/thebear.jpg',
    'images/you.jpg',
    'images/office.jpg',
    'images/shel.jpg',
    'images/story.jpg',
    'images/eup.jpg',
];

let timer = 0;
let timerInterval;
let score = 0;
let matched = 0;
let mistakes = 0;
let flippedCards = [];
const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const nextLevelBtn = document.getElementById('next-level');
const mistakesDisplay = document.getElementById('mistakes');
const startBtn = document.getElementById('start-game');

function shuffle(array) {
    return array.concat(array).sort(() => 0.5 - Math.random());
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function generateBoard() {
    const shuffled = shuffle(images);
    board.innerHTML = '';
    shuffled.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.img = imgSrc;

        const img = document.createElement('img');
        img.src = imgSrc;
        card.appendChild(img);

        card.addEventListener('click', () => handleClick(card));
        board.appendChild(card);
    });
}

function handleClick(card) {
    if (flippedCards.includes(card) || card.classList.contains('matched') || flippedCards.length === 2) return;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if (first.dataset.img === second.dataset.img) {
            first.classList.add('matched');
            second.classList.add('matched');
            score++;
            scoreDisplay.textContent = score;
            matched += 2;
            if (matched === images.length * 2) {
                nextLevelBtn.style.display = 'inline-block';
                clearInterval(timerInterval);
            }
            flippedCards = [];
        } else {
            mistakes++;
            mistakesDisplay.textContent = mistakes;

            first.classList.add('shake');
            second.classList.add('shake');
            setTimeout(() => {
                first.classList.remove('shake');
                second.classList.remove('shake');
                flippedCards = [];
            }, 500);
        }
    }
}

nextLevelBtn.addEventListener('click', () => {
    window.location.href = 'tvE2.html';
});

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    board.classList.remove('hidden');
    generateBoard();
    startTimer();
});


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}