import { FC } from 'react';
import { LoadMoreBtnProps } from './LoadMoreBtnProps';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.loadBtn} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
