const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountryByName(searchCountry) {
  return fetch(`${BASE_URL}/${searchCountry}`).then(response => {
    response.json();
  });
}
