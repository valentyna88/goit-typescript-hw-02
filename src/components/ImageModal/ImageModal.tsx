import css from './ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(15, 15, 16, 0.6)',
  },
};

const ImageModal = ({ isOpen, onClose, imageUrl, imageTitle, imageAuthor }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <img src={imageUrl} alt={imageTitle} />
      <div className={css.modalContent}>
        <p>{imageTitle}</p>
        <p>{`Author: ${imageAuthor}`}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
