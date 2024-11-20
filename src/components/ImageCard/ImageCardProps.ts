import { Image } from '../../types';

export interface ImageCardProps {
  image: Image;
  onClick: (imageUrl: string, imageTitle: string, imageAuthor: string) => void;
}
