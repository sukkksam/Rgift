const screens = document.querySelectorAll('.screen');
const scoreEl = document.getElementById('score');
const game = document.getElementById('game');

let score = 0;
let interval;

function show(id) {
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

document.querySelector('#start .btn').onclick = () => show('rules');
document.querySelector('#rules .btn').onclick = startGame;

function startGame() {
    score = 0;
    scoreEl.textContent = score;
    show('game');

    interval = setInterval(createHeart, 1500);
}

function createHeart() {
    const heart = document.createElement('img');
    heart.src = 'img/heart.png';
    heart.className = 'heart';

    heart.style.left = Math.random() * (window.innerWidth - 60) + 'px';
    heart.style.animationDuration = (4 + Math.random() * 3) + 's';

    heart.onclick = () => {
        score++;
        scoreEl.textContent = score;
        heart.remove();
        checkWin();
    };

    heart.addEventListener('animationend', () => {
        if (!heart.parentNode) return;

        // минус очко
        score = Math.max(0, score - 1);
        scoreEl.textContent = score;

        // делаем разбитое
        heart.src = 'img/broken.png';
        heart.classList.add('broken');

        // фиксируем внизу
        heart.style.top = 'calc(100% - 60px)';
        heart.style.animation = 'none';

        // убираем
        setTimeout(() => heart.remove(), 500);
    });

    game.appendChild(heart);
}

function checkWin() {
    if (score >= 14) {
        clearInterval(interval);
        show('win');
    }
}

document.getElementById('win').onclick = () => {
    show('photos');
};
const photos = document.querySelectorAll('#photos img');

photos.forEach((img) => {
    const x = Math.random() * 40 + 30; // %
    const y = Math.random() * 40 + 20; // %
    const r = Math.random() * 30 - 15; // deg

    img.style.left = x + '%';
    img.style.top = y + '%';
    img.style.transform = `translate(-50%, -50%) rotate(${r}deg)`;
});