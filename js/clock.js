const clock = document.getElementById("clock");

let thisHour;

function getClock() {
    const date = new Date();
    thisHour = date.getHours();
    const hours = String(thisHour).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const time = `${hours} : ${minutes} : ${seconds}`;
    clock.innerText = time;
}
getClock();
setInterval(getClock, 1000);

export { thisHour };
