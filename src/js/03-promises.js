import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('input[name = "delay"]'),
  step: document.querySelector('input[name = "step"]'),
  amount: document.querySelector('input[name = "amount"]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let inputDelay = Number(refs.delay.value);
  let inputStep = Number(refs.step.value);
  let inputAmount = Number(refs.amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += inputStep;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

