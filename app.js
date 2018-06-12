const form = document.querySelector('form');
const searchInput = document.querySelector('input');

const BASE_URL = 'https://my-imdb-scraper.now.sh/';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();

  const searchTerm = searchInput.value;

  getSearchResults(searchTerm);
}

function getSearchResults(searchTerm) {
  return fetch(`${BASE_URL}search/${searchTerm}`)
    .then(res => res.json())
    .then(results => {
      console.log(results);
    });
}
