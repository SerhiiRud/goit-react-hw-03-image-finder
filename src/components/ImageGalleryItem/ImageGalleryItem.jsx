export const ImageGalleryItem = ({ imageData, onImgClick }) => {
  const { largeImageURL, tags } = imageData;
  return (
    <li
      onClick={e => {
        e.preventDefault();
        console.log(1);
        onImgClick({ largeImageURL, tags });
      }}
    >
      <img src={imageData.previewURL} alt={imageData.tags} />
    </li>
  );
};
