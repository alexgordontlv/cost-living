import React from "react";
import "./search.styles.css";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  return (
    <div className="search__input">
      <SearchIcon fontSize="small" style={{ color: "grey" }} />
      <input placeholder="Search..." type="text" className="input" />
    </div>
  );
};

export default Search;
