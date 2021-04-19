import './styles.css';
import countryCardTpl from './templates/country-card.hbs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
};

fetchCountryByName()
  .then(renderCountryCard)
  .catch(error => {
    console.log(error);
  });

function fetchCountryByName() {
  return fetch(`https://restcountries.eu/rest/v2/name/Ukraine`).then(
    response => {
      return response.json();
    },
  );
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
}
