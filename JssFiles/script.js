let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let previousTime = 0;
let previousSolveTime = null;

const timerElement = document.getElementById('timer');
const scrambleElement = document.getElementById('scramble');
const cubeTypeSelect = document.getElementById('cubeType');
const generateScrambleButton = document.getElementById('generateScramble');
const resetButton = document.getElementById('reset');

generateScrambleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event from affecting the timer
    const cubeType = cubeTypeSelect.value;
    scrambleElement.textContent = generateScramble(cubeType);
    generateScrambleButton.blur(); // Remove focus from the button
});

resetButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent event from affecting the timer
    resetTimer();
    resetButton.blur(); // Remove focus from the button
});

cubeTypeSelect.addEventListener('change', (event) => {
    event.stopPropagation(); // Prevent event from affecting the timer
    cubeTypeSelect.blur(); // Remove focus from the dropdown
});

function generateScramble(cubeType) {
    const moves = {
        '2x2': ['U', 'D', 'L', 'R', 'F', 'B'],
        '3x3': ['U', 'D', 'L', 'R', 'F', 'B'],
        '4x4': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '5x5': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '6x6': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '7x7': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '8x8': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '9x9': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '10x10': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '11x11': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '12x12': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '13x13': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '14x14': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '15x15': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '16x16': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '17x17': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '18x18': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '19x19': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '20x20': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        '21x21': ['U', 'D', 'L', 'R', 'F', 'B', 'u', 'd', 'l', 'r', 'f', 'b'],
        'pyraminx': ['U', 'L', 'R', 'B'],
        'skewb': ['U', 'L', 'R', 'B']
    };
    const scrambleLength = {
        '2x2': 11,
        '3x3': 20,
        '4x4': 40,
        '5x5': 60,
        '6x6': 80,
        '7x7': 100,
        '8x8': 120,
        '9x9': 140,
        '10x10': 160,
        '11x11': 180,
        '12x12': 200,
        '13x13': 220,
        '14x14': 240,
        '15x15': 260,
        '16x16': 280,
        '17x17': 300,
        '18x18': 320,
        '19x19': 340,
        '20x20': 360,
        '21x21': 380,
        'pyraminx': 10,
        'skewb': 10
    };
    let scramble = '';
    for (let i = 0; i < scrambleLength[cubeType]; i++) {
        const move = moves[cubeType][Math.floor(Math.random() * moves[cubeType].length)];
        const suffix = Math.random() > 0.5 ? "'" : '';
        scramble += move + suffix + ' ';
    }
    return scramble.trim();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        scrambleElement.style.display = 'none';
        document.body.classList.remove('green');
        document.body.classList.add('red');
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        document.body.classList.remove('red');
        document.body.classList.add('yellow');
        handleStartStop();
    }
});

document.addEventListener('mousedown', (event) => {
    if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SELECT') {
        scrambleElement.style.display = 'none';
        document.body.classList.remove('green');
        document.body.classList.add('red');
    }
});

document.addEventListener('mouseup', (event) => {
    if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'SELECT') {
        document.body.classList.remove('red');
        document.body.classList.add('yellow');
        handleStartStop();
    }
});

function handleStartStop() {
    if (isRunning) {
        scrambleElement.style.display = 'block';
        clearInterval(timer);
        isRunning = false;
        previousTime = elapsedTime;
        document.body.classList.remove('yellow');
        document.body.classList.add('green');
        if (previousSolveTime !== null) {
            const improvement = previousSolveTime - elapsedTime;
            const improvementText = improvement > 0 ? `<span class="improvement">(-${formatTime(improvement)})</span>` : `<span class="longer-time">(+${formatTime(-improvement)})</span>`;
            timerElement.innerHTML += ` ${improvementText}`;
        }
        previousSolveTime = elapsedTime;
    } else {
        scrambleElement.style.display = 'none';
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        isRunning = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    scrambleElement.style.display = 'block';
    isRunning = false;
    elapsedTime = 0;
    previousTime = 0;
    timerElement.textContent = '00:00:00.000';
    document.body.classList.remove('red', 'yellow', 'green');
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
