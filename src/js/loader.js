const preloader = document.querySelector('.loader');
const body = document.querySelector('body');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.remove();
    body.style.overflowY = 'scroll';
  }, 1500);
});
