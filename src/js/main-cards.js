// *this script fetches and renders events on a webpage based on user input, handles form submissions, and provides feedback through notifications. It also includes functionality for modal interactions and pagination.


// Import Statements:
// Imports various functions and libraries needed for the script, such as fetching events, creating markup, rendering pagination, scrolling, choosing the best image, and handling modals and notifications.

import fetchEvents from './fetch-data';
import markupEvents from './main-cards-markup';
import renderPagination from './pagination';
import { scrollPage } from './scroll';
import { chooseBestImage } from './fetch-data';
import MicroModal from 'micromodal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// DOM Element References:
// Stores references to various DOM elements, such as form inputs, card containers, the form itself, a spinner, a button, and a pagination box.

const inputSelectCountry = document.querySelector('#chose-country');
const inputSearch = document.querySelector('.search-input');
const cards = document.querySelector('.main-cards');
const form = document.querySelector('form');
const spinner = document.querySelector('.spinner');
const moreAuthorBtn = document.querySelector('.event__btn2');
const paginationBox = document.querySelector('.tui-pagination');

// Variables:
// Initializes variables for the search value and country, with the default country set to 'pl'.

let searchValue = '';
let country = 'pl';

// Function renderCards:
// Defines a function called renderCards that takes an optional parameter pageNumber with a default value of 0.
// Inside renderCards Function:
// The function toggles the visibility of a spinner while fetching events.
// Calls the fetchEvents function (presumably fetching events from the Ticketmaster API) with the search value, country, and page number.
// Processes the retrieved events data, extracting relevant details.
// Updates the HTML content of the card container, renders pagination, and scrolls the page if the page number is not 0.
// Catches errors during the fetch, displaying a notification if there are no matching results.
// Finally, toggles the spinner's visibility.

const renderCards = (pageNumber = 0) => {
  spinner.classList.toggle('spinner-show');
  fetchEvents(searchValue, country, pageNumber)
    .then(({ events, pageInfo }) => {
      const eventDetails = events.map(item => ({
        name: item.name,
        urlImage: chooseBestImage(item),
        date: item.dates.start.localDate,
        place:
          item._embedded && item._embedded.venues[0].name
            ? item._embedded.venues[0].name
            : 'Place will be soon',
        id: item.id,
        urlTicket: item.url,
      }));

      cards.innerHTML = '';
      markupEvents(eventDetails);
      renderPagination(pageInfo);
      paginationBox.style.display = 'flex';
      if (pageNumber !== 0) {
        setTimeout(() => {
          scrollPage();
        }, 500);
      }
    })
    .catch(err => {
      console.log(err);
      // paginationBox.style.display = 'none';
      // notfound.style.display = 'block';
      // notfound.innerText =
      // 'Sorry, Try again!';
        Notify.failure(
        'Sorry, there are no matching in your search query. Please try again.'
      );
    })
    .finally(() => {
      setTimeout(() => {
        spinner.classList.toggle('spinner-show');
      }, 1300);
    });
};
renderCards();

// Event Listeners:
// Event listener for form submission
// Listens for form submissions and button clicks, triggering the rendering of events with different parameters.
  
form.addEventListener('submit', e => {
  e.preventDefault();
  cards.innerHTML = '';
  searchValue = inputSearch.value.trim();
  country = inputSelectCountry.dataset.country;
  renderCards();
  inputSearch.value = '';
});
moreAuthorBtn.addEventListener('click', e => {
  e.preventDefault();
  cards.innerHTML = '';
  console.log(e.target.dataset.name);
  searchValue = e.target.dataset.name;
  country = '';
  renderCards();
  MicroModal.close('modal-1');
});
// Export Statement:
// Exports the renderCards function as the default export of the module.
export default renderCards;
