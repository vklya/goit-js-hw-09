function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector('body'),
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
};

let changeColor = null;

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

function onStart() {
    changeColor = setInterval(getColor, 1000);
    disableStartBtn(true);
}

function onStop() {
    clearInterval(changeColor);
    disableStartBtn(false);
}

function getColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function disableStartBtn(isDisable) {
    refs.start.disabled = isDisable;
}