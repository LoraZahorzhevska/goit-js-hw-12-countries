import fetchCountries from '../js/fetchCountries.js';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/list.hbs';
import debounce from 'lodash.debounce';
//import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searchInput: document.querySelector('.input-control'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 1000));

let catalogeCountries = '';

function onSearch() {
  e.preventDefault();
  clearSearch();

  catalogeCountries = refs.input.value;
  if (!catalogeCountries) {
    return;
  }
  //   const input = e.currentTarget;
  //   const countryName = input.elements.query.value;

  fetchCountries(catalogeCountries)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    })
    .finally(() => input.reset());
}

function clearSearch() {
  refs.cardContainer.innerHTML = '';
}

function renderCountryCard(country) {
  const markup = countryCardTpl(...country);
  refs.cardContainer.innerHTML = markup;
}
