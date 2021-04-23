import fetchCountries from '../js/fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/list.hbs';
import debounce from 'lodash.debounce';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchInput: document.querySelector('.input-control'),
  cardContainer: document.querySelector('.js-card-container'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

let catalogeCountries = '';

function onSearch() {
  clearSearch();

  catalogeCountries = refs.searchInput.value;
  if (!catalogeCountries) {
    return;
  }
  fetchCountries(catalogeCountries)
    .then(resultCountry)
    .catch(err => console.log(err));
}

function clearSearch() {
  refs.cardContainer.innerHTML = '';
}

function resultCountry(country) {
  if (country.length === 1) {
    renderCountryCard(countryCardTpl, country);
  } else if (country.length > 1 && country.length <= 10) {
    renderCountryCard(countryListTpl, country);
  } else if (country.length > 10) {
    createMessage(
      error,
      'To many matches found. Please enter a more specific query!',
    );
  }
}

function createMessage(information, text) {
  information({
    text: `${text}`,
    delay: 1400,
    closerHover: true,
  });
}

function renderCountryCard(template, country) {
  refs.cardContainer.insertAdjacentHTML('beforeend', template(country));
}
