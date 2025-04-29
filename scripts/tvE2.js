const imagePairs = [
    { src: 'images/things.jpg', matchId: 'HG' },
    { src: 'images/things2.jpg', matchId: 'HG' },
    { src: 'images/friends.jpg', matchId: 'DB' },
    { src: 'images/friends2.jpg', matchId: 'DB' },
    { src: 'images/mother.jpg', matchId: 'HP' },
    { src: 'images/mother2.jpg', matchId: 'HP' },
    { src: 'images/hannah.jpg', matchId: 'MR' },
    { src: 'images/hannah2.jpg', matchId: 'MR' },
    { src: 'images/show.jpg', matchId: 'TM' },
    { src: 'images/show2.jpg', matchId: 'TM' },
    { src: 'images/carly.jpg', matchId: 'LW' },
    { src: 'images/carly2.jpg', matchId: 'LW' },
];

let timer = 0;
let timerInterval;
let score = 0;
let matched = 0;
let mistakes = 0;
let message = '';
let flippedCards = [];
const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const nextLevelBtn = document.getElementById('next-level');
const mistakesDisplay = document.getElementById('mistakes');
const startBtn = document.getElementById('start-game');
const winMessage = document.getElementById('win-message');

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
    if (card.classList.contains('matched') || flippedCards.length === 2) return;

    if (flippedCards.includes(card)) {
        card.classList.remove('selected');
        flippedCards = flippedCards.filter(c => c !== card);
        return;
    }

    card.classList.add('selected');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if (first.dataset.matchId === second.dataset.matchId) {
            first.classList.add('matched');
            second.classList.add('matched');

            first.classList.remove('selected');
            second.classList.remove('selected');

            score++;
            scoreDisplay.textContent = score;
            matched += 2;
            if (matched === imagePairs.length) {
                nextLevelBtn.style.display = 'inline-block';
                clearInterval(timerInterval);

                confetti({
                    particleCount: 200,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                if (timer <= 10) {
                    message = `Master of the Match! (${timer} seconds)`;
                } else if (timer <= 30) {
                    message = `Not bad, you're pretty quick! (${timer} seconds)`;
                } else if (timer <= 60) {
                    message = `Took your sweet time... (${timer} seconds)`;
                } else {
                    message = `Wow, were you making popcorn too? (${timer} seconds)`;
                }

                winMessage.textContent = message;
                winMessage.classList.remove('hidden');
            }

            flippedCards = [];
        } else {
            mistakes++;
            mistakesDisplay.textContent = mistakes;

            first.classList.add('shake');
            second.classList.add('shake');
            setTimeout(() => {
                first.classList.remove('shake', 'selected');
                second.classList.remove('shake', 'selected');
                flippedCards = [];
            }, 500);
        }
    }
}

nextLevelBtn.addEventListener('click', () => {
    window.location.href = 'tvE3.html';
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