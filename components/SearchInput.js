function SearchInput({ searchValue, searchHandler }) {
  return (
    <form>
      <input type="text" value={searchValue} onChange={searchHandler} />
    </form>
  );
}

export default SearchInput;
