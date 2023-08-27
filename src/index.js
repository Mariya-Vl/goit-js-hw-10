import { fetchBreeds, fetchCatByBreed, hideLoader } from './cat-api';

const refs = {
  selector: document.querySelector('.breed-select'),
  catInfoWrapp: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
};

fetchBreeds()
  .then(data => {
    refs.error.setAttribute('hidden', 'hidden');
    return renderSelectorList(data);
  })
  .catch(() => {
    hideLoader;
    refs.error.removeAttribute('hidden');
  });

refs.error.setAttribute('hidden', 'hidden');
function renderSelectorList(breedsList) {
  const markupSelector = breedsList
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  refs.selector.innerHTML = markupSelector;
}

refs.selector.addEventListener('change', showCatsInfo);

function showCatsInfo(evt) {
  refs.error.setAttribute('hidden', 'hidden');
  const breedId = evt.target.value;
  // console.log("ID породи: ",breedId);
  fetchCatByBreed(breedId)
    .then(response => {
      return response;
    })
    .then(data => {
      return data.data[0];
    })
    .then(data => {
      const descr = data.breeds[0].description;
      const name = data.breeds[0].name;
      const url = data.url;
      const temperament = data.breeds[0].temperament;
      const markupSelector = `<img src="${url}" alt="${name} width="300" height="200">
        <h2>${name}</h2>
        <p>${descr}</p>
        <p>${temperament}</p>`;
      refs.catInfoWrapp.innerHTML = markupSelector;
    })
    .catch(() => {
      hideLoader;
      refs.error.removeAttribute('hidden');
    });
}
