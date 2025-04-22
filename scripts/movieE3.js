const images = [
    'https://i.pinimg.com/736x/6b/28/e6/6b28e6955e4a60c9f946c2373618a2fe.jpg',
    'https://i.pinimg.com/736x/19/3a/d1/193ad114b26b17647095d7ae0ff12ea1.jpg',
    'https://i.pinimg.com/736x/ac/76/82/ac76820a2d092c7f5a481abb5b86e343.jpg',
    'https://i.pinimg.com/736x/2f/e0/2d/2fe02dfab5d0230b82fd76129877368c.jpg',
    'https://i.pinimg.com/736x/ed/00/84/ed0084794bcad12095cb832dc9185a70.jpg',
    'https://i.pinimg.com/736x/30/70/67/3070673c25a0e0515edae71b606eaafc.jpg',
];

let timer = 0;
let timerInterval;
let score = 0;
let matched = 0;
let flippedCards = [];
const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const nextLevelBtn = document.getElementById('next-level');

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

startTimer();
generateBoard();