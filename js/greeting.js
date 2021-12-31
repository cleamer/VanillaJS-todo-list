import { thisHour } from "./clock.js";

const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const GREETING_LINE = {
    mornig: "Good Mornig",
    afternoon: "Good Afternoon",
    evenig: "Good Evenig",
    night: "Good Night",
};

function MakeGreetingSentence(username) {
    let greetingText;
    if (thisHour >= 6 && thisHour < 11) {
        greetingText = `${GREETING_LINE.mornig}, ${username}!`;
    } else if (thisHour >= 11 && thisHour < 16) {
        greetingText = `${GREETING_LINE.afternoon}, ${username}!`;
    } else if (thisHour >= 16 && thisHour < 24) {
        greetingText = `${GREETING_LINE.evenig}, ${username}!`;
    } else {
        greetingText = `${GREETING_LINE.night}, ${username}!`;
    }
    return greetingText;
}

function IgotUsername(username) {
    loginForm.classList.add(HIDDEN_CLASSNAME);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = MakeGreetingSentence(username);
}
function onSubmitEvent(event) {
    event.preventDefault();
    const username = loginInput.value;
    IgotUsername(username);
    localStorage.setItem(USERNAME_KEY, username);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.addEventListener("submit", onSubmitEvent);
} else {
    IgotUsername(savedUsername);
}
