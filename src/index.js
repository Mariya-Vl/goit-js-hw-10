import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const refs = {
  selector: document.querySelector('.breed-select'),
  catInfoWrapp: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
  loader: document.querySelector('.loader'),
  firstOption: document.querySelector('[data-placeholder]'),
};

showLoader();

fetchBreeds()
  .then(data => {
    hideError();
    hideLoader();
    showSelect();
    return renderSelectorList(data);
  })
  .catch(() => {
    hideLoader();
    showError();
  });

hideError();

function renderSelectorList(breedsList) {
  const markupSelector = breedsList
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  refs.selector.insertAdjacentHTML('beforeend', markupSelector);
  refs.firstOption.setAttribute('disabled', 'disabled');
}

refs.selector.addEventListener('change', showCatsInfo);

function showCatsInfo(evt) {
  hideError();
  showLoader();
  const breedId = evt.target.value;
  // console.log("ID породи: ",breedId);
  fetchCatByBreed(breedId)
    .then(response => {
      hideInfo();
      showLoader();
      return response;
    })
    .then(data => {
      return data.data[0];
    })
    .then(data => {
      showInfo();
      hideLoader();
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
      hideLoader();
      showError();
    });
}

function hideLoader() {
  Loading.remove();
  refs.loader.setAttribute('hidden', 'hidden');
  refs.catInfoWrapp.removeAttribute('hidden');
}

function showLoader() {
  Loading.dots('Loading data. Please wait...');
  refs.catInfoWrapp.setAttribute('hidden', 'hidden');
  refs.loader.removeAttribute('hidden');
}

function hideInfo() {
  refs.catInfoWrapp.setAttribute('hidden', 'hidden');
}

function showInfo() {
  refs.catInfoWrapp.removeAttribute('hidden');
}

function hideError() {
  refs.error.setAttribute('hidden', 'hidden');
  refs.catInfoWrapp.removeAttribute('hidden');
}

function showError() {
  refs.catInfoWrapp.setAttribute('hidden', 'hidden');
  refs.error.removeAttribute('hidden');
}

function showSelect() {
  refs.selector.removeAttribute('hidden');
}
