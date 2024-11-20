import css from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
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
