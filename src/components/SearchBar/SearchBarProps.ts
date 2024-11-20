export interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
  inputValue: string;
  onInputChange: (newValue: string) => void;
}
