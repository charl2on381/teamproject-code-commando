import { fetchInfoEvent, chooseBestImage } from './fetch-data';
import MicroModal from 'micromodal';
import renderCards from './main-cards';
const modalContainer = document.querySelector('.main-card-modal-container');
const modalContentElem = document.querySelector('.main-card-modal-content');
const modalTopImage = document.querySelector('.main-card-modal-top-image');
const eventImageElem = document.querySelector('.event__image');
const infoElem = document.querySelector('.event__info');
const infoTitleElem = document.querySelector('.event__info_title');
const startDateElem = document.querySelector('.event__start_date');
const placeElemTab = document.querySelector('.event__place-tab');
const placeElem = document.querySelector('.event__place');
const whoElem = document.querySelector('.event__who');
const pricesElemMob = document.querySelector('.event__prices-mob');
const whoElemMob = document.querySelector('.event__who-mob');
const pricesElem = document.querySelector('.event__prices');
const cardsElem = document.querySelector('.main-cards');
const moreAuthorBtn = document.querySelector('.event__btn2');

MicroModal.init();

cardsElem.addEventListener('click', event => {
  event.preventDefault();

  MicroModal.show('modal-1');
  updateModalData(event.target.dataset.id);
});

export async function updateModalData(eventId) {
  const eventData = await fetchInfoEvent(eventId);

  let nameArtist = eventData.name;
  moreAuthorBtn.dataset.name = nameArtist;
  modalTopImage.innerHTML = '';
  eventImageElem.innerHTML = '';
  pricesElem.innerHTML = '';
  pricesElemMob.innerHTML = '';
  placeElem.innerHTML = '';
  placeElemTab.innerHTML = '';

  modalTopImage.insertAdjacentHTML(
    'beforeend',
    `<img src="${chooseBestImage(eventData)}">`
  );

  eventImageElem.insertAdjacentHTML(
    'beforeend',
    `<img src="${chooseBestImage(eventData)}">`
  );

  infoElem.textContent = eventData.info || eventData.description;
  if (!infoElem.textContent) {
    infoElem.style = 'display: block';
    infoTitleElem.style = 'display: block';
    infoElem.innerHTML = 'There is no available information for this event.';
  } else {
    infoElem.style = 'display: block';
    infoTitleElem.style = 'display: block';
  }


  startDateElem.innerHTML = `
    ${eventData.dates.start.localDate}
    <br>
    ${eventData.dates.start.localTime || ''} (${eventData.dates.timezone})
  `;


  whoElem.textContent = eventData.name;
  whoElemMob.textContent = eventData.name;

  for (const venue of eventData._embedded.venues) {
    placeElem.insertAdjacentHTML(
      'beforeend',
      `
    ${venue.city.name}, ${venue.country.name}
    <br>
    ${venue.name}
    `
    );

    placeElemTab.insertAdjacentHTML(
      'beforeend',
      `
    ${venue.city.name}, ${venue.country.name}
    <br>
    ${venue.name}
    `
    );
  }


  if (!eventData.priceRanges) {

    pricesElem.innerHTML = 'There are no tickets available for this event';
    pricesElemMob.innerHTML = 'There are no tickets available for this event';
  } else {
    for (const priceRange of eventData.priceRanges) {
      pricesElem.insertAdjacentHTML(
        'beforeend', `
          <div class="event__single_price">
          <div>
              ${priceRange.type.toUpperCase()} ${priceRange.min}-${priceRange.max} ${priceRange.currency}
            </div>
            <a class="event__btn1 event__buy_tickets" href="${
              eventData.url
            }" target="_blank">BUY TICKETS</a>
          </div>
      `);

      pricesElemMob.insertAdjacentHTML(
        'beforeend', `
          <div class="event__single_price">
          <div>
              ${priceRange.type.toUpperCase()} ${priceRange.min}-${priceRange.max} ${priceRange.currency}
            </div>
            <a class="event__btn1 event__buy_tickets" href="${
              eventData.url
            }" target="_blank">BUY TICKETS</a>
          </div>
      `);
    }
  }
}
