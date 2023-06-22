import Notiflix from 'notiflix';
import { searchImages } from './search-api';

const KEY = '37600791-d09d47700ee4db7cdd78bc1fd';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more-button');
const endMessage = document.querySelector('.end-message');
const noImagesMessage = document.querySelector('.no-images-message');
let searchValue = '';
let currentPage = 1;
let totalHits = 0;
let isButtonVisible = false;

form.addEventListener('submit', e => {
  e.preventDefault();
  searchValue = input.value.trim();

  if (searchValue === '') {
    Notiflix.Notify.failure(`${noImagesMessage.textContent}`);
    loadMore.style.display = 'none';
    isButtonVisible = false;
    return;
  }
  currentPage = 1;
  gallery.innerHTML = '';

  performImageSearch();
  isButtonVisible = true;
});

async function performImageSearch() {
  try {
    const image = await searchImages(KEY, searchValue, currentPage);

    if (image.hits.length === 0) {
      handleNoImagesFound();
      return;
    }

    totalHits = image.totalHits;

    const galleryElements = createGalleryElements(image.hits);
    insertGalleryElements(galleryElements);
    if (currentPage === 1 && isButtonVisible) {
      loadMore.style.display = 'block';
      endMessage.style.display = 'none';
    }

    if (currentPage * 40 >= totalHits) {
      loadMore.style.display = 'none';
      Notiflix.Notify.failure(`${endMessage.textContent}`);
    } else {
      endMessage.style.display = 'none';
    }
  } catch (error) {
    console.log(error);
  }
}

function handleNoImagesFound() {
  gallery.innerHTML = '';
  loadMore.style.display = 'none';
  Notiflix.Notify.failure(`${noImagesMessage.textContent}`);
  isButtonVisible = false;
}

function createGalleryElements(hits) {
  return hits.map(element => {
    const { webformatURL, tags, likes, views, comments, downloads } = element;
    return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
  });
}

function insertGalleryElements(elements) {
  gallery.insertAdjacentHTML('beforeend', elements.join(''));
  noImagesMessage.style.display = 'none';
}

loadMore.addEventListener('click', async () => {
  currentPage++;
  await performImageSearch();
});
