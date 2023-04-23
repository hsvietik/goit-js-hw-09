import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let selectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate > Date.now()) {
      startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    }
  },
};
flatpickr(dateInput, options);

startBtn.disabled = true;

startBtn.addEventListener('click', startCount);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function startCount(evt) {
  const timerId = setInterval(() => {
    const currentDate = new Date();
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - currentDate
    );

    daysValue.textContent = days.toString().padStart(2, '0');
    hoursValue.textContent = hours.toString().padStart(2, '0');
    minutesValue.textContent = minutes.toString().padStart(2, '0');
    secondsValue.textContent = seconds.toString().padStart(2, '0');

    if (
      daysValue.textContent === '00' &&
      hoursValue.textContent === '00' &&
      minutesValue.textContent === '00' &&
      secondsValue.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }, 1000);
}
