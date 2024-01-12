let isRunning = false;
let startTime;
let laps = [];
let intervalId; // Declare intervalId globally

function startPause() {
    const button = document.getElementById('startPause');

    if (!isRunning) {
        isRunning = true;
        startTime = new Date().getTime();
        updateDisplay();  // Move this line up
        button.innerText = 'Pause';
        intervalId = setInterval(updateDisplay, 100);
    } else {
        isRunning = false;
        button.innerText = 'Resume';
        clearInterval(intervalId);
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsFormatted).padStart(2, '0')}`;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    document.getElementById('startPause').innerText = 'Start';
    document.getElementById('display').innerText = '00:00:00';
    laps = [];
    updateLaps();
}

function recordLap() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    laps.push(formatTime(elapsedTime));
    updateLaps();
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';

    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}