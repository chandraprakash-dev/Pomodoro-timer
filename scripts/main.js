function startTimer() {
    let time = display.textContent.split(':');
    let minute = time[0];
    let second = time[1];
    console.log(minute, second);
    if(minute === '0') console.log(typeof(minute));
    const timerId = setInterval( () => {
        if(second == 1 && minute == 0) clearInterval(timerId);

        if(second === "00") {
            minute --;
            second = "60";
        }
        second --;
        if(minute === '0') minute = '0' + minute;
        if(second < 10) second = '0' + second;
        console.log(minute, second);
        display.textContent = minute + ":" + second;
    }, 1000);
}

const start = document.querySelector('button[value="start"]');
start.addEventListener('click', startTimer);

const display = document.querySelector('div[id="display"]');