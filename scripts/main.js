////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
let currentTiming = 'pomodoro';
let timings = {
    'pomodoro' : 25,
    'short' : 5,
    'long': 30
};
////////////////////////////////////////////////////////////////////////////////////////////////
function loopBlock() {
    let slice = 0;
    setTiming('pomodoro');

    // Watch the clock
    let config = { childList: true };

    let callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let minute = getMinAndSec()[0];
                let second = getMinAndSec()[1];
                if(minute || second) return;
                slice += 1
                if(slice === 8) {
                    setTiming('long');
                    observer.disconnect();
                    return;
                } else if(slice % 2) {
                    setTiming('short');
                } else {
                    setTiming('pomodoro');
                }
                startTimer();
                return;
            }
        }
    };
    let observer = new MutationObserver(callback);
    observer.observe(clock, config);
}

function closePopup() {
    const popUpContainer = document.querySelector('#popup-container');
    popUpContainer.style.display = 'none';
}

function updateClock() {
    clock.textContent = timings[currentTiming] + " : 00";
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

function  setTiming(timing) {
    console.log(timing);
    currentTiming = timing;
    resetTimer();
}

function setMode() {
    let timing = this.value;
    setTiming(timing);
}

function resetTimer() {
    stopTimer();
    updateClock()
}

function stopTimer() {
    if(timerId) clearInterval(timerId);
}

function getMinAndSec() {
    let timeString = clock.textContent;
    timeString = timeString.replace(/\s+/g, '').split(':');
    return [+timeString[0], +timeString[1]];
}

function startTimer() {
    let minute = getMinAndSec()[0];
    let second = getMinAndSec()[1];

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
const customize = document.querySelector('button[value="customize"]');
const pomodoro = document.querySelector('button[value="pomodoro"]');
const short = document.querySelector('button[value="short"]');
const long = document.querySelector('button[value="long"]');
const loop = document.querySelector('button[value="loop"]');
const clock = document.querySelector('div[id="clock"]');
const start = document.querySelector('button[value="start"]');
const stop = document.querySelector('button[value="stop"]');
const reset = document.querySelector('button[value="reset"]');

customize.addEventListener('click', bringUpForm);
pomodoro.addEventListener('click', setMode);
short.addEventListener('click', setMode);
long.addEventListener('click', setMode);
loop.addEventListener('click', loopBlock);
start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);

