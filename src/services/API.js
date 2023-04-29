import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '34317827-ccdab7647b739ba94e7a7be8e';
const PARAMETERS = '&image_type=photo&orientation=horizontal&per_page=12';

export async function getImages(searchTerm) {
  try {
    const images = await axios.get(
      `${BASE_URL}?key=${USER_KEY}&q=${searchTerm}${PARAMETERS}`
    );
    return images;
  } catch (error) {
    console.log(error.message);
  }
}
