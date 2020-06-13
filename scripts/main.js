////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let currentMode = 'pomodoro';
let timings = {
    'pomodoro' : 25,
    'short' : 5,
    'long': 30
};
////////////////////////////////////////////////////////////////////////////////////////////////
function closePopup() {
    const popUpContainer = document.querySelector('#popup-container');
    popUpContainer.style.display = 'none';
}

function updateClock() {
    clock.textContent = timings[currentMode] + " : 00";
}

function  updateTimings() {
    timings.pomodoro = document.timeInfo.pomodoro.value;
    timings.short = document.timeInfo.short.value ;
    timings.long = document.timeInfo.long.value;
    updateClock();
    closePopup();
}

function bringUpForm() {
    const popUpContainer = document.querySelector('#popup-container');
    popUpContainer.style.display = 'initial';

    document.timeInfo.pomodoro.value = timings.pomodoro;
    document.timeInfo.short.value = timings.short;
    document.timeInfo.long.value = timings.long;

    const close = document.querySelector('div[id="close"]');
    close.addEventListener('click', closePopup);

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
    updateClock()
}

function stopTimer() {
    if(timerId) clearInterval(timerId);
}

function startTimer() {
    let timeString = clock.textContent;
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
        clock.textContent = minutePrefix + minute + " : " + secondPrefix + second;
    }, 1000);
}

// Main starts here
const body = document.querySelector('body');
// const main = document.querySelector('main');
const customize = document.querySelector('button[value="customize"]');
const pomodoro = document.querySelector('button[value="pomodoro"]');
const short = document.querySelector('button[value="short"]');
const long = document.querySelector('button[value="long"]');
const clock = document.querySelector('div[id="clock"]');
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

