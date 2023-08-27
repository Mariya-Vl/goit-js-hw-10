import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9ZPmIldUr9abwz3IgSZzgxXtnP6IQXK1n0RKGOYSvk7H3YRbw6zqm0A1E7Ck70Si';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const ENDPOINT_BREEDS = '/breeds/';
const ENDPOINT_CAT_SEARCH = '/images/search/';
const loader = document.querySelector('.loader');
const catInfoWrapp = document.querySelector('.cat-info');

export function fetchBreeds() {
  showLoader();
  return axios.get(`${ENDPOINT_BREEDS}`).then(response => {
    if (!response.status == 200) {
      throw new Error(response.message);
    }
    hideLoader();
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  hideInfo();
  showLoader();
  return axios
    .get(`${ENDPOINT_CAT_SEARCH}?breed_ids=${breedId}`)
    .then(response => {
      if (!response.status == 200) {
        throw new Error(response.message);
      }
      showInfo();
      hideLoader();
      return response;
    });
}

function hideLoader() {
  loader.setAttribute('hidden', 'hidden');
}

function showLoader() {
  loader.removeAttribute('hidden');
}

function hideInfo() {
  catInfoWrapp.setAttribute('hidden', 'hidden');
}

function showInfo() {
  catInfoWrapp.removeAttribute('hidden');
}
