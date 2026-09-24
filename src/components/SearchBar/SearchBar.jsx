import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  searchTerm = "",
  onSearchChange = () => {},
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search by Restaurant"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchBtn}>
        <SearchOutlinedIcon className={styles.searchIcon} />
        <span>Search</span>
      </button>
    </form>
  );
}
