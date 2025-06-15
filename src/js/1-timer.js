import flatpickr from "flatpickr";
import iziToast from 'izitoast';

import "flatpickr/dist/flatpickr.min.css";
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

flatpickr.localize({
  weekdays: {
    shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    longhand: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  months: {
    shorthand: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    longhand: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
  },
  firstDayOfWeek: 1,
});

const picker = flatpickr("#datetime-picker", {
  dateFormat: "Y-m-d H:i",
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: '#fff',
        iconColor: '#fff',
        titleColor: '#fff',
        timeout: 5000,
        progressBar: true,
        progressBarColor: 'rgba(181, 27, 27, 1)',
      });

      startButton.disabled = true;
      userSelectedDate = null;
      return;
    }

    userSelectedDate = selectedDates[0];
    startButton.disabled = false;
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const remainderAfterDays = ms % day;
  const hours = Math.floor(remainderAfterDays / hour);
  const remainderAfterHours = remainderAfterDays % hour;
  const minutes = Math.floor(remainderAfterHours / minute);
  const seconds = Math.floor((remainderAfterHours % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  startButton.disabled = true;
  picker.element.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const delta = userSelectedDate - now;

    if (delta <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      picker.element.disabled = false;
      return;
    }

    const timeLeft = convertMs(delta);
    updateTimerDisplay(timeLeft);
  }, 1000);
}

startButton.addEventListener('click', startCountdown);