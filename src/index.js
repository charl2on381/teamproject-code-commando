import Notiflix from 'notiflix';

let srchTerm;

const searchParams = new URLSearchParams({
    apikey: "qzVhUCvMLtmK8Qleu8bTcHSwiHC2hmPw",
    //keyword: srchTerm,
});



function fetchEvents() {
    /*return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${searchParams}`, {
        headers: {
            type: "GET",
            async: true,
            dataType: "json"
        }

    })*/
    return fetch(`https://app.ticketmaster.com/discovery/v2/suggest.json?${searchParams}`)
}

fetchEvents().then(
    (response) => {
        if (!response.ok) {
            /*loaderMsg.classList.add('hide');
            errorMsg.classList.remove('hide');*/
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

    }
)

    .catch(error => {

        //loaderMsg.classList.add('hide');
        //errorMsg.classList.remove('hide')
        Notiflix.Loading.remove();
        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");



        console.error(`Error message ${error}`)

    })

.then((eventsInfo)=>{console.log(eventsInfo)})    