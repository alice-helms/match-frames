const imagePairs = [
    { src: 'https://i.pinimg.com/474x/c9/a0/4b/c9a04baa9ef3be6ebca4e20b76e4e7b3.jpg', matchId: 'rdj' },
    { src: 'https://i.pinimg.com/474x/39/ad/f1/39adf16f847b20665ea09cd0f38bfcff.jpg', matchId: 'rdj' },
    { src: 'images/hermione1.jpg', matchId: 'hermione' },
    { src: 'images/hermione2.jpg', matchId: 'hermione' },
    { src: 'images/ron1.jpg', matchId: 'ron' },
    { src: 'images/ron2.jpg', matchId: 'ron' }
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
    window.location.href = 'movieM2.html';
});

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    board.classList.remove('hidden');
    generateBoard();
    startTimer();
});