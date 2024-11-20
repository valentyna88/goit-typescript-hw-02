import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';

import fetchImages from '../../api/unsplash-api';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Image } from '../../types';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageTitle, setImageTitle] = useState<string>('');
  const [imageAuthor, setImageAuthor] = useState<string>('');

  const toastStyles = {
    position: 'top-right',
    toastOptions: {
      style: {
        marginTop: '120px',
        backgroundColor: '#d32f2f',
        color: '#ffffff',
      },
    },
  } as const;

  useEffect(() => {
    const fetchHandler = async (): Promise<void> => {
      if (!query) return;
      try {
        setIsLoading(true);

        const data = await fetchImages(query, page);
        const results = data.results;

        if (results.length === 0) {
          toast('There is no results with this search query');
          return;
        }

        setImages(prevImages => [...prevImages, ...results]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError('An unknown error occurred');
          toast.error('An unknown error occurred');
        }
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

  const handleSubmit = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setInputValue('');
  };

  const handleInputChange = (newValue: string): void => {
    setInputValue(newValue);
  };

  const loadMoreImages = async (): Promise<void> => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (
    url: string,
    title: string | null,
    author: string | null
  ): void => {
    setIsModalOpen(true);
    setImageUrl(url);
    setImageTitle(title || 'No description available');
    setImageAuthor(author || 'Unknown author');
  };

  const closeModal = (): void => {
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
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={loadMoreImages} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={imageUrl}
        imageTitle={imageTitle}
        imageAuthor={imageAuthor}
      />
    </div>
  );
}

export default App;
