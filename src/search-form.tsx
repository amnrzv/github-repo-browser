import { useState } from 'react';

interface SearchFormProps {
  searchTerm: string;
  onChangeSearchTerm: (searchParam: string) => void;
  onSubmitHandler: () => void;
}

export const SearchForm = ({
  searchTerm,
  onSubmitHandler,
  onChangeSearchTerm,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <label>
        Language:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
        />
      </label>
      <button type="submit">Fetch repos</button>
    </form>
  );
};
