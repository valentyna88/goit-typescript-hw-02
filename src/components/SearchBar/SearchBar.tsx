import { ChangeEvent, FC, FormEvent } from 'react';
import { GrSearch } from 'react-icons/gr';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
  inputValue: string;
  onInputChange: (newValue: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  onSubmit,
  inputValue,
  onInputChange,
}) => {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }
    await onSubmit(inputValue);
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
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onInputChange(event.target.value)
          }
        />
        <button className={css.searchButton} type="submit">
          <GrSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
