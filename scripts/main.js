////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let currentMode = 'Pomodoro';
let timings = {
    'Pomodoro' : "25 : 00",
    'Short' : "5 : 00",
    'Long': "30 : 00"
};
////////////////////////////////////////////////////////////////////////////////////////////////
function updateTimings() {
    timings.Pomodoro = document.timeInfo.Pomodoro.value;
    timings.Short = document.timeInfo.Short.value;
    timings.Long = document.timeInfo.Long.value;
    display.textContent = timings[currentMode];
    console.log(display.textContent);
}

function addInput(form, timing) {
    const br = document.createElement('br');
    const label = document.createElement('label');
    label.setAttribute('for', timing);
    label.textContent = timing;
    form.appendChild(label);
    const input = document.createElement('input');
    input.setAttribute('id', timing);
    input.value = timings[timing].split(' ')[0];
    form.appendChild(input);
    form.appendChild(br);
}

function createPopUp() {
    const popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'popup-container');
    const popup = document.createElement('div');
    popup.setAttribute('id', 'popup');
    popupContainer.appendChild(popup);
    body.appendChild(popupContainer);
    return popup;
}

function bringUpForm() {
    const popup = createPopUp();

    const form = document.createElement('form');
    form.setAttribute('name', 'timeInfo');

    // Let's create input fields for each of the timings
    Object.keys(timings).forEach(timing => addInput(form, timing));

    // Add save button to submit the form
    const save = document.createElement('input');
    save.type = 'button';
    save.value = 'Save';
    form.appendChild(save);

    save.addEventListener('click', updateTimings);
    popup.appendChild(form);
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

