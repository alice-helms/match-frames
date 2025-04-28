const imagePairs = [
    { src: 'images/poker.jpg', matchId: 'HG' },
    { src: 'images/the.jpg', matchId: 'HG' },
    { src: 'images/freak.jpg', matchId: 'DB' },
    { src: 'images/bmirror.jpg', matchId: 'DB' },
    { src: 'images/parls.jpg', matchId: 'HP' },
    { src: 'images/good.jpg', matchId: 'HP' },
    { src: 'images/one.jpg', matchId: 'MR' },
    { src: 'images/heart.jpg', matchId: 'MR' },
    { src: 'images/friday.jpg', matchId: 'TM' },
    { src: 'images/ted.jpg', matchId: 'TM' },
    { src: 'images/silo.jpg', matchId: 'LW' },
    { src: 'images/dead.jpg', matchId: 'LW' },
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
    alert('Next level coming soon!');
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