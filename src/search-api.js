import axios from 'axios';

export async function searchImages(KEY, searchValue, currentPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
    );
    const image = response.data;

    return image;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch images');
  }
}
