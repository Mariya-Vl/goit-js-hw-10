import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9ZPmIldUr9abwz3IgSZzgxXtnP6IQXK1n0RKGOYSvk7H3YRbw6zqm0A1E7Ck70Si';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const ENDPOINT_BREEDS = '/breeds/';
const ENDPOINT_CAT_SEARCH = '/images/search/';

export function fetchBreeds() {
  return axios.get(`${ENDPOINT_BREEDS}`).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${ENDPOINT_CAT_SEARCH}?breed_ids=${breedId}`)
    .then(response => {
      return response;
    });
}
