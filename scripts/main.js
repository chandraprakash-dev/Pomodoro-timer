////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
let timerId;
////////////////////////////////////////////////////////////////////////////////////////////////
function stopTimer() {
    if(timerId) clearInterval(timerId);
}

function startTimer() {
    let time = display.textContent.split(':');
    let minute = +time[0];
    let second = +time[1];
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