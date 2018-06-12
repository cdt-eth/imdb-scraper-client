const main = document.querySelector('main');
const imdbID = window.location.search.match(/imdbID=(.*)/)[1];
const BASE_URL = 'https://my-imdb-scraper.now.sh/';

function getMovie(imdbID) {
  return fetch(`${BASE_URL}movie/${imdbID}`).then(res => res.json());
}

function showMovie(movie) {
  console.log(movie);
  const section = document.createElement('section');
  main.appendChild(section);

  const date = dateFns.parse(movie.datePublished);
  movie.datePublished = dateFns.format(date, 'MMMM Do YYYY');

  const properties = [
    {
      title: 'Rating',
      property: 'rating'
    },
    {
      title: 'Run Time',
      property: 'runTime'
    },
    {
      title: 'Released',
      property: 'datePublished'
    },
    {
      title: 'Summary',
      property: 'summary'
    },
    {
      title: 'Story Line',
      property: 'storyLine'
    }
  ];

  const descriptionHTML = properties.reduce((html, property) => {
    html += `
        <dt class="col-sm-2">${property.title}</dt>
        <dd class="col-sm-10">${movie[property.property]}</dd>`;
    return html;
  }, '');

  section.outerHTML = `
  <h1 class="text-center">${movie.title}</h1>
      <section class="row">
        <div class="col-sm-4">
          <img src="${movie.poster}" class="img-fluid" />
        </div>
        <div class="col-sm-8">
          <dl class="row">
            ${descriptionHTML}
          </dl>
          <button onclick="window.location.href='/'" type="button" class="btn btn-danger"> Search Again </button>
        </div>
      </section>
    `;
}

getMovie(imdbID).then(showMovie);
