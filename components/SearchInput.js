import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchInput({ searchQuery, handler }) {
  return (
    <label htmlFor="search-input">
      <input
        type="text"
        className="w-full p-2 text-gray-600 placeholder-gray-500 placeholder-opacity-100 border border-pink-300 rounded"
        value={searchQuery}
        id="search-input"
        placeholder="Search..."
        onChange={handler}
      />
      {/* <FontAwesomeIcon icon={faSearch} /> */}
    </label>
  );
}

export default SearchInput;
