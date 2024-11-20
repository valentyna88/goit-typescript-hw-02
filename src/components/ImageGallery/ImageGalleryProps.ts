import { Image } from '../../types';

export interface ImageGalleryProps {
  images: Image[];
  onImageClick: (
    imageUrl: string,
    imageTitle: string,
    imageAuthor: string
  ) => void;
}
