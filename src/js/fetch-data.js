const spinner = document.querySelector('.spinner');
const axios = require('axios').default;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'ae2uc1D3kJjKuzBMDuDMJhn3W5PltdLm';

async function fetchEvents(searchValue, country, page) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      method: 'get',
      params: {
        apikey: API_KEY,
        keyword: searchValue,
        size: 20,
        page: page,
        countryCode: country,
      },
    });
    return {
      events: response.data._embedded.events,
      pageInfo: response.data.page,
    };
  } catch (error) {
    console.log(error);
  }
}

export default fetchEvents;

export async function fetchInfoEvent(eventId) {
  try {
    spinner.classList.toggle('spinner-show');
    const response = await axios.get(`${BASE_URL}/${eventId}.json`, {
      method: 'get',
      params: {
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      spinner.classList.toggle('spinner-show');
    }, 1100);
  }
}

export function chooseBestImage(eventDetails) {
  for (let image of eventDetails.images) {
    if (image.width > 400) {
      return image.url;
    }
  }

  return eventDetails.images[0].url;
}
