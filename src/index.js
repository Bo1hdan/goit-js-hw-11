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

// --------------------------------------------------------TEST-----------------------

// import axios from 'axios';

// const bestSellersUrl = 'https://books-backend.p.goit.global/books/top-books';
// const categoriesUrl = 'https://books-backend.p.goit.global/books/category-list';
// const testCategory = 'Series Books';
// const bookId = '643282b3e85766588626a1a8';

// async function searchTopBooks(bookUrl) {
//   try {
//     const response = await axios.get(`${bookUrl}`);
//     const books = response.data;

//     const bookData = books.map(book => {
//       const currentBook = book.books[0];
//       return {
//         image: currentBook.book_image,
//         title: currentBook.title,
//         author: currentBook.author,
//       };
//     });
//     console.log(bookData);

//     return bookData;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Failed to find books');
//   }
// }
// searchTopBooks(bestSellersUrl);

// async function searchAllCategory() {
//   try {
//     const response = await axios.get(`${categoriesUrl}`);
//     const categories = response.data;

//     for (let i = 0; i < categories.length; i++) {
//       const category = categories[i].list_name;
//       console.log(category);
//     }

//     return categories;
//   } catch (error) {
//     console.log(error);
//     throw new Error('There is no such category');
//   }
// }
// searchAllCategory();

// async function searchCategory(selectedCategory) {
//   try {
//     const response = await axios.get(
//       `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
//     );
//     const categories = response.data;

//     for (let i = 0; i < categories.length; i++) {
//       const category = categories[i]._id;
//       // const category = categories[i].list_name;
//       console.log(category);
//     }

//     return categories;
//   } catch (error) {
//     console.log(error);
//     throw new Error('There is no such category');
//   }
// }
// searchCategory(testCategory);

// async function searchById(id) {
//   try {
//     const response = await axios.get(
//       `https://books-backend.p.goit.global/books/${id}`
//     );
//     const booksId = response.data;

//     console.log(booksId);
//     return booksId;
//   } catch (error) {
//     console.log(error);
//     throw new Error('There is no such id');
//   }
// }
// searchById(bookId);
