// make a GET request to get the first movie data
fetch('http://localhost:3000/films/1')
.then(response => response.json())
.then(movieData => {
    // display the movie data on the HTML page
    const poster = document.querySelector('#poster');
    const title = document.querySelector('#title');
    const runtime = document.querySelector('#runtime');
    const showtime = document.querySelector('#showtime');
    const availableTickets = document.querySelector('#available-tickets');
    const buyTicketBtn = document.querySelector('#buy-ticket-btn');

    poster.src = movieData.poster;
    title.textContent = movieData.title;
    runtime.textContent = `Runtime: ${movieData.runtime} minutes`;
    showtime.textContent = `Showtime: ${movieData.showtime}`;
    const ticketsRemaining = movieData.capacity - movieData.tickets_sold;
    availableTickets.textContent = `Available Tickets: ${ticketsRemaining}`;
    if (ticketsRemaining === 0) {
        buyTicketBtn.disabled = true;
    }
})

//function where you fetch all movies and display to the left of the page as a menu for the all movies

const filmsList = document.querySelector('ul#films');

fetch('http://localhost:3000/films')
.then(response => response.json())
.then(movies => {
    movies.forEach(movie => {
        const movieElement = document.createElement('li');
        movieElement.classList.add('film', 'item');
        movieElement.innerHTML = movie.title;
        filmsList.appendChild(movieElement);
    });
})

//function to buy a ticket for a movie and give out alert whenever the movie are sold out

const buyTicketButton = document.querySelector('#buy-ticket-btn');
const availableTickets = document.querySelector('#available-tickets');

buyTicketButton.addEventListener('click', async () => {
const response = await fetch('http://localhost:3000/purchase-ticket', {
    method: 'POST'
});

const data = await response.json();

if (data.success) {
    availableTickets.textContent = data.availableTickets;
} else {
    alert('Sorry, this showing is sold out.');
}
});

