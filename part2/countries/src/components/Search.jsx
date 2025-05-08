const Search = ({ searchTerm, onUpdateSearch }) => {
  return <input type="text" value={searchTerm} onChange={onUpdateSearch} />;
};

export default Search