export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="searchbar">
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.currentTarget.elements[1].value);
          e.currentTarget.reset();
        }}
      >
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
