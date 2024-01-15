const cardEvents = document.querySelector('.main-cards');

function markupEvents(eventItems) {
  const newCard = eventItems
    .map(card => {
      let nameEvent = card.name;
      if (card.name.length > 17) {
        nameEvent = card.name.slice(0, 17) + '...';
      }
      return `<li class="main-cards-item" data-id="${card.id}">
      <div class="main-cards-box animate__animated animate__flipInX" data-id="${card.id}">
        <img class="main-cards-image" src="${card.urlImage}" alt="${card.name}" loading="lazy" data-id="${card.id}"/>
        <h2 class="main-cards-title" data-id="${card.id}">${nameEvent}</h2>
        <p class="main-cards-date" data-id="${card.id}">${card.date}</p>
        <p class="main-cards-place" data-id="${card.id}">
        <span class="main-cards-pin" data-id="${card.id}">${card.place}</span>
     </p>
      </div>
    </li>`;
    })
    .join('');

  cardEvents.insertAdjacentHTML('beforeend', newCard);
}

export default markupEvents;
