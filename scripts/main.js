////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let mode = 'Pomodoro';
////////////////////////////////////////////////////////////////////////////////////////////////
function bringUpForm() {
    const popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'popup-container');
    const popup = document.createElement('div');
    popup.setAttribute('id', 'popup');
    popupContainer.appendChild(popup);
    body.appendChild(popupContainer);

    const form = document.createElement('form');
    form.setAttribute('name', 'timeInfo');
    let br = document.createElement('br');


    const pomodoroLabel = document.createElement('label');
    pomodoroLabel.setAttribute('for', 'pomodoroInput');
    pomodoroLabel.textContent = "Pomodoro";
    form.appendChild(pomodoroLabel);
    const pomodoro = document.createElement('input');
    pomodoro.setAttribute('id', 'pomodoroInput');
    form.appendChild(pomodoro);
    form.appendChild(br);

    const shortLabel = document.createElement('label');
    shortLabel.setAttribute('for', 'pomodoroInput');
    shortLabel.textContent = "short break";
    form.appendChild(shortLabel);
    const short = document.createElement('input');
    form.appendChild(short);
    form.appendChild(br);

    const longLabel = document.createElement('label');
    longLabel.setAttribute('for', 'pomodoroInput');
    longLabel.textContent = "long break";
    form.appendChild(longLabel);
    const long = document.createElement('input');
    form.appendChild(long);
    form.appendChild(br);

    popup.appendChild(form);
}
function setMode() {
    mode = this.value;
    console.log(mode);
    resetTimer();
}

function resetTimer() {
    stopTimer();
    let time;
    switch (mode) {
        case 'pomodoro':
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
const body = document.querySelector('body');
const main = document.querySelector('main');
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

