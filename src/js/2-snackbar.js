import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(ms => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${ms}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(89, 161, 13, 1)',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
        timeout: 5000,
        progressBarColor: 'rgba(50, 97, 1, 1)',
      });
    })
    .catch(ms => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${ms}ms`,
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: '#fff',
        titleColor: '#fff',
        iconColor: '#fff',
        timeout: 5000,
        progressBarColor: 'rgba(181, 27, 27, 1)',
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
}
