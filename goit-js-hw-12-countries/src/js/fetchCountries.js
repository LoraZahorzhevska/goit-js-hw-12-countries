const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountryByName(country) {
  return fetch(`${BASE_URL}/${country}`).then(response => {
    response.json();
  });
}
