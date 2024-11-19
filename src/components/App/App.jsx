import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';

import fetchImages from '../../unsplash-api';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const toastStyles = {
    position: 'top-right',
    toastOptions: {
      style: {
        marginTop: '120px',
        backgroundColor: '#d32f2f',
        color: '#ffffff',
      },
    },
  };

  useEffect(() => {
    const fetchHandler = async () => {
      if (!query) return;
      try {
        setIsLoading(true);

        const data = await fetchImages(query, page);
        const results = data.results;

        if (results.length === 0) {
          toast('There is no results with this search query');
          return;
        }

        setTotalPages(data.total_pages);

        setImages(prevImages =>
          prevImages ? [...prevImages, ...results] : results
        );
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [query, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages(null);
    setInputValue('');
  };

  const handleInputChange = newValue => {
    setInputValue(newValue);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setIsModalOpen(true);
    setImageUrl(url);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <Toaster {...toastStyles} />
      <SearchBar
        onSubmit={handleSubmit}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {!isLoading && images && page < totalPages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={imageUrl}
      />
    </div>
  );
}

export default App;
