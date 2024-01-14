import renderCards from './main-cards';

const inputSelectCountry = document.querySelector('#chose-country');
const inputSearch = document.querySelector('.search__input');
const countryBox = document.querySelector('.country');
const countries = [...document.querySelectorAll('.country__item')];
const countryList = document.querySelector('.country__list');
const searchCountryIcon = document.querySelector('#searchCountryIcon');
const form = document.querySelector('form');

inputSelectCountry.addEventListener('click', e => {
  countryBox.classList.toggle('hide');
  polygonIcon.classList.toggle('rotate');
  inputSelectCountry.value = '';
  renderListCountry(e);
  inputSelectCountry.classList.toggle('header__input--open');
});

countryBox.addEventListener('click', e => {
  inputSelectCountry.value = e.target.textContent;
  inputSelectCountry.dataset.country = e.target.dataset.country;
  countryBox.classList.toggle('hide');
  inputSelectCountry.classList.toggle('header__input--open');
});

inputSelectCountry.addEventListener('input', e => {
  renderListCountry(e);
});

const renderListCountry = e => {
  const currentWord = e.target.value.toUpperCase();
  let result = countries;
  result = result.filter(countries =>
    countries.textContent.toUpperCase().includes(currentWord)
  );
  countryList.textContent = '';
  result.forEach(item => countryList.appendChild(item));
};
export default form;
