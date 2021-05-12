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
    loop.classList.add('looping');

    setTiming('pomodoro');
    start.click();

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
                    start.click();
                    observer.disconnect();
                    return;
                } else if(slice % 2) {
                    setTiming('short');
                    start.click();
                } else {
                    setTiming('pomodoro');
                    start.click();
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

function playSound(timing) {
    const prev = document.querySelector('.playing');
    if(prev) {
        prev.pause();
        prev.currentTime = 0;
        prev.classList.remove('playing');
    }

    const audio = document.querySelector(`.${timing}-audio`);
    audio.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
    console.log(audio);
}

function  setTiming(timing) {
    const prevImg = document.querySelector('.active');
    if(prevImg) prevImg.classList.remove('active');

    const image = document.querySelector(`#${timing}-img`);
    image.classList.add('active');


    playSound(timing);

    // clear previous selected
    const prevButton = document.querySelector('.selected');
    if(prevButton) {
        prevButton.classList.remove('selected');
    }

    document.querySelector(`button[value="${timing}"]`).classList.add('selected');

    console.log(timing);
    currentTiming = timing;
    resetTimer();
}

function setMode() {
    loop.classList.remove('looping');
    let timing = this.value;

    setTiming(timing);
}

function resetTimer() {
    stopTimer();
    updateClock()
}

function stopTimer() {
    pause.classList.add('hidden');
    start.classList.remove('hidden');

    if(timerId) clearInterval(timerId);
}

function getMinAndSec() {
    let timeString = clock.textContent;
    timeString = timeString.replace(/\s+/g, '').split(':');
    return [+timeString[0], +timeString[1]];
}

function startTimer() {
    start.classList.add('hidden');
    pause.classList.remove('hidden');

    console.log(currentTiming);
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
const logo = document.querySelector('#logo');
const clock = document.querySelector('div[id="clock"]');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const reset = document.querySelector('#reset');

customize.addEventListener('click', bringUpForm);
pomodoro.addEventListener('click', setMode);
short.addEventListener('click', setMode);
long.addEventListener('click', setMode);
loop.addEventListener('click', loopBlock);
start.addEventListener('click', startTimer);
pause.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);
