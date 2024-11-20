import { FC } from 'react';
import { ImageCardProps } from './ImageCardProps';
import css from './ImageCard.module.css';

const ImageCard: FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={css.card}>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() =>
          onClick(image.urls.regular, image.alt_description, image.user.name)
        }
      />
    </div>
  );
};

export default ImageCard;
