import { GrSearch } from 'react-icons/gr';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit, inputValue, onInputChange }) => {
  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }
    onSubmit(inputValue);
    onInputChange('');
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.field}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={event => onInputChange(event.target.value)}
        />
        <button className={css.searchButton} type="submit">
          <GrSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
