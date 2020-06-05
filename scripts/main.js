function startTimer() {
    let time = display.textContent.split(':');
    let minute = time[0];
    let second = time[1];

    setInterval( () => {
        if(second === "00") {
            minute --;
            second = "60";
        }
        second --;
        if(minute == '0') minute = '0' + minute;
        if(second < 10) minute = '0' + minute;

        display.textContent = minute + ":" + second;
    }, 1000);
}

const start = document.querySelector('button[value="start"]');
start.addEventListener('click', startTimer);

const display = document.querySelector('div[id="display"]');