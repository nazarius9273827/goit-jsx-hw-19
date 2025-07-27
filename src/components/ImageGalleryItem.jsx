export default function ImageGalleryItem({ smallUrl, largeUrl, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(largeUrl)}>
      <img src={smallUrl} alt="" />
    </li>
  );
}
