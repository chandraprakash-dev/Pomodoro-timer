////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let mode = 'Pomodoro';
////////////////////////////////////////////////////////////////////////////////////////////////
function resetTimer(mode) {
    stopTimer();
    let time;
    switch (mode) {
        case 'Pomodoro':
            time = "25 : 00";
            break;
        case 'short':
            time = "5 : 00";
            break;
        case 'long':
            time = "30 : 00";
            break;
    }
    display.textContent = time;
}

function stopTimer() {
    if(timerId) clearInterval(timerId);
}

function startTimer() {
    let timeString = display.textContent;
    timeString = timeString.replace(/\s+/g, '').split(':');

    let minute = +timeString[0];
    let second = +timeString[1];
    console.log(minute, second);

    timerId = setInterval( () => {
        if(minute === 0) {
            if(second === 0) return
            if(second === 1) clearInterval(timerId);
        }

        if(second === 0) {
            minute --;
            second = 60;
        }

        second --;
        let minutePrefix = '';
        let secondPrefix = '';
        if(minute < 10) minutePrefix = '0';
        if(second < 10) secondPrefix = '0';
        console.log(minute, second);
        display.textContent = minutePrefix + minute + " : " + secondPrefix + second;
    }, 1000);
}

// Main starts here
const display = document.querySelector('div[id="display"]');

const start = document.querySelector('button[value="start"]');
start.addEventListener('click', startTimer);

const stop = document.querySelector('button[value="stop"]');
stop.addEventListener('click', stopTimer);

const reset = document.querySelector('button[value="reset"]');
reset.addEventListener('click', resetTimer);

