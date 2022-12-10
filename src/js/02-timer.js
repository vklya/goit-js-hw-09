import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    secs: document.querySelector('[data-seconds]'),
}

let currentTime = null;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
            Notify.failure('Please choose a date in the future', {position: "center-top", timeout: 5000});
            return;
        }
        disableStartBtn(false);
    },
};

const selectedTime =  flatpickr(refs.input, options);

refs.start.addEventListener('click', onStart);

disableStartBtn(true);

function onStart(e) {
    e.preventDefault();
    Notify.success('The timer has been started', {position: "center-top", timeout: 5000});
    disableStartBtn(false);
    intervalId = setInterval(runTimer, 1000);
}

function runTimer() {
    const differTime = selectedTime.selectedDates[0] - new Date;
    if (differTime <= 0) {
        clearInterval(intervalId);
        return;
    }
    changeValueTimer(convertMs(differTime));
}

function changeValueTimer({ days, hours, mins, secs }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.mins.textContent = addLeadingZero(mins);
    refs.secs.textContent = addLeadingZero(secs);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function disableStartBtn(isDisable) {
    refs.start.disabled = isDisable;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const mins = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const secs = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, mins, secs };
    }