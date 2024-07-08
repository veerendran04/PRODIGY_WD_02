let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');

let minutesElement = document.getElementById('minutes');
let secondsElement = document.getElementById('seconds');
let millisecondsElement = document.getElementById('milliseconds');
let lapsList = document.getElementById('lapsList');

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function updateDisplay() {
    let currentTime = Date.now();
    let timeDifference = currentTime - startTime + elapsedTime;
    let milliseconds = Math.floor((timeDifference % 1000) / 10);
    let seconds = Math.floor((timeDifference / 1000) % 60);
    let minutes = Math.floor(timeDifference / 60000);

    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatTime(milliseconds);
}

function startStop() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    lapsList.innerHTML = '';
    lapTimes = [];
}

function recordLap() {
    if (isRunning) {
        let currentTime = Date.now();
        let timeDifference = currentTime - startTime + elapsedTime;
        let milliseconds = Math.floor((timeDifference % 1000) / 10);
        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor(timeDifference / 60000);

        let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        lapTimes.push(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);