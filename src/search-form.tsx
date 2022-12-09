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
        Programming language:
        <input
          type="text"
          placeholder="Enter name of programming language. Eg. Typescript"
          value={searchTerm}
          onChange={(e) => onChangeSearchTerm(e.target.value)}
        />
      </label>
      <button type="submit">Fetch repos</button>
    </form>
  );
};
