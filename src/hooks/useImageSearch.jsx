import { useState, useEffect, useCallback } from 'react';

const API_KEY = '47475037-a019c47be6692940311d6755b';
const PER_PAGE = 12;

export default function useImageSearch(query, page) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await res.json();
      setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading };
}
