const imagePairs = [
    { src: 'images/david.jpg', matchId: 'fin' },
    { src: 'images/david2.jpg', matchId: 'fin' },
    { src: 'images/guy.jpg', matchId: 'rich' },
    { src: 'images/guy2.jpg', matchId: 'rich' },
    { src: 'images/chris.jpg', matchId: 'nola' },
    { src: 'images/chris2.jpg', matchId: 'nola' },
    { src: 'images/greta.jpg', matchId: 'ger' },
    { src: 'images/greta2.jpg', matchId: 'ger' },
    { src: 'images/quen.jpg', matchId: 'tar' },
    { src: 'images/quen2.jpg', matchId: 'tar' },
    { src: 'images/bay.jpg', matchId: 'mi' },
    { src: 'images/bay2.jpg', matchId: 'mi' },
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
    const shuffled = [...imagePairs].sort(() => 0.5 - Math.random());
    board.innerHTML = '';

    shuffled.forEach(({ src, matchId }) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.matchId = matchId;

        const img = document.createElement('img');
        img.src = src;
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
        if (first.dataset.matchId === second.dataset.matchId) {
            first.classList.add('matched');
            second.classList.add('matched');
            score++;
            scoreDisplay.textContent = score;
            matched += 2;
            if (matched === imagePairs.length) {
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
    window.location.href = 'movieH3.html';
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