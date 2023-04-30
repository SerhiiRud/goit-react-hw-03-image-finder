import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageData, onImgClick }) => {
  const { largeImageURL, tags } = imageData;
  return (
    <GalleryItem
      onClick={e => {
        e.preventDefault();
        console.log(1);
        onImgClick({ largeImageURL, tags });
      }}
    >
      <GalleryItemImage src={imageData.webformatURL} alt={imageData.tags} />
    </GalleryItem>
  );
};
