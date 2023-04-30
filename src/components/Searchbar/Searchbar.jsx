import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
  ButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchContainer>
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.currentTarget.elements[1].value);
          e.currentTarget.reset();
        }}
      >
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};
