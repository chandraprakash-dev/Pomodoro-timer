////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let currentMode = 'pomodoro';
let timings = {
    'pomodoro' : "25 : 00",
    'short' : "5 : 00",
    'long': "30 : 00"
};
////////////////////////////////////////////////////////////////////////////////////////////////
function bringUpForm() {
    const popUpContainer = document.querySelector('#popup-container');
    popUpContainer.style.display = 'initial';

    document.timeInfo.pomodoro.value = timings.pomodoro.split(' ')[0];
    document.timeInfo.short.value = timings.short.split(' ')[0];
    document.timeInfo.long.value = timings.long.split(' ')[0];

    const save = document.querySelector('input[value="Save"]');
    save.addEventListener('click', updateTimings);
}

function setMode() {
    currentMode = this.value;
    console.log(currentMode);
    resetTimer();
}

function resetTimer() {
    stopTimer();
    display.textContent = timings[currentMode];
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
        display.textContent = minutePrefix + minute + " : " + secondPrefix + second;
    }, 1000);
}

// Main starts here
const body = document.querySelector('body');
// const main = document.querySelector('main');
const customize = document.querySelector('button[value="customize"]');
const pomodoro = document.querySelector('button[value="pomodoro"]');
const short = document.querySelector('button[value="short"]');
const long = document.querySelector('button[value="long"]');
const display = document.querySelector('div[id="display"]');
const start = document.querySelector('button[value="start"]');
const stop = document.querySelector('button[value="stop"]');
const reset = document.querySelector('button[value="reset"]');

customize.addEventListener('click', bringUpForm);
pomodoro.addEventListener('click', setMode);
short.addEventListener('click', setMode);
long.addEventListener('click', setMode);
start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

