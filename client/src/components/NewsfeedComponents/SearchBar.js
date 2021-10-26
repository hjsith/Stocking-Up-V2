import React from "react";
// search bar for the newsfeed
const SearchBar = (props) => {
  return (
    <div>
      <input
        type="search"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
    </div>
  );
};
export default SearchBar;
