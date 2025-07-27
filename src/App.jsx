import { useState, useEffect, useCallback, useMemo } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';
import './styles.css';

const API_KEY = '47475037-a019c47be6692940311d6755b';
const PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await res.json();
      setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = useCallback(newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  }, [query]);

  const handleLoadMore = () => setPage(prev => prev + 1);

  const handleImageClick = useCallback(imageUrl => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  }, []);

  const closeModal = () => setShowModal(false);

  const hasImages = useMemo(() => images.length > 0, [images]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {hasImages && !loading && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal image={selectedImage} onClose={closeModal} />
      )}
    </>
  );
}
