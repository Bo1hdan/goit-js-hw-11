const KEY = '37600791-d09d47700ee4db7cdd78bc1fd';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const btn = document.querySelector('button');
const gallery = document.querySelector('.gallery');
let searchValue = '';
let searchImg = '';

form.addEventListener('submit', e => {
  e.preventDefault();
  searchValue = input.value;

  SearchImages();
  showImg();
});

async function SearchImages() {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const image = await response.json();
    console.log(image);
  } catch (error) {
    console.log(error);
  }
}

async function showImg() {
  try {
    const res = await fetch(`${searchImg}`);
    const blob = await res.blob();
    const imgUrl = URL.createObjectURL(blob);

    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    document.body.appendChild(imgElement);
  } catch (error) {
    console.log(error);
  }
}
