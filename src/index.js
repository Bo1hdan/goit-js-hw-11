const KEY = '37600791-d09d47700ee4db7cdd78bc1fd';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
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

  SearchImages();
  isButtonVisible = true;
});

async function SearchImages() {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );
    const image = await response.json();

    if (image.hits.length === 0) {
      gallery.innerHTML = '';
      loadMore.style.display = 'none';
      Notiflix.Notify.failure(`${noImagesMessage.textContent}`);
      loadMore.style.display = 'none';
      isButtonVisible = false;

      return;
    }
    totalHits = image.totalHits;

    let galleryElement = '';
    image.hits.forEach(element => {
      let largeImage = element.largeImageURL;
      let smallImage = element.webformatURL;
      let description = element.tags;
      let likes = element.likes;
      let views = element.views;
      let comments = element.comments;
      let downloads = element.downloads;
      galleryElement += `<div class="photo-card">
  <img src="${smallImage}" alt="${description}" loading="lazy" />
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

    gallery.innerHTML += galleryElement;
    noImagesMessage.style.display = 'none';
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

loadMore.addEventListener('click', async () => {
  currentPage++;
  await SearchImages();
});
