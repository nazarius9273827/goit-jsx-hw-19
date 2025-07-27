import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="gallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallUrl={webformatURL}
          largeUrl={largeImageURL}
          onClick={onImageClick}
        />
      ))}
    </ul>
  );
}
