// const KEY = '37600791-d09d47700ee4db7cdd78bc1fd';

// const form = document.querySelector('#search-form');
// const input = document.querySelector('input');
// const btn = document.querySelector('button');
// const gallery = document.querySelector('.gallery');
// let searchValue = '';
// let searchImg = '';

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   searchValue = input.value;

//   SearchImages();
// });

// async function SearchImages() {
//   try {
//     const response = await fetch(
//       `https://pixabay.com/api/?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     const image = await response.json();
//     const data = image.hits;
//     data.forEach(element => {
//       let largeImage = element.largeImageURL;
//       let smallImage = element.webformatURL;
//       let description = element.tags;
//       let likes = element.likes;
//       let views = element.views;
//       let comments = element.comments;
//       let downloads = element.downloads;
//       let galleryElement = `<div class="photo-card">
//   <img src="${smallImage}" alt="${description}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>`;
//       return galleryElement;
//     });
//     gallery.innerHTML = galleryElement;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function showImg() {
//   try {
//     const res = await fetch(`${searchImg}`);
//     const blob = await res.blob();
//     const imgUrl = URL.createObjectURL(blob);

//     const imgElement = document.createElement('img');
//     imgElement.src = imgUrl;
//     document.body.appendChild(imgElement);
//   } catch (error) {
//     console.log(error);
//   }
// }

// --------------------------------------------------------------------------------
const KEY = '37600791-d09d47700ee4db7cdd78bc1fd';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
  e.preventDefault();
  searchValue = input.value;

  SearchImages();
});

async function SearchImages() {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const image = await response.json();
    const data = image.hits;
    let galleryElement = '';
    data.forEach(element => {
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
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`;
    });
    gallery.innerHTML = galleryElement;
  } catch (error) {
    console.log(error);
  }
}
