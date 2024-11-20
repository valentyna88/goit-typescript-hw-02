import { FC } from 'react';
import { ErrorMessageProps } from './ErrorMessageProps';
import css from './ErrorMessage.module.css';

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <p className={css.errorMessage}>{message}</p>;
};

export default ErrorMessage;
