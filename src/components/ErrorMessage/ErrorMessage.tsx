import { FC } from 'react';
import css from './ErrorMessage.module.css';
import { ErrorMessageProps } from './ErrorMessageProps';

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <p className={css.errorMessage}>{message}</p>;
};

export default ErrorMessage;
