import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./SearchRestaurant.module.css";

export default function SearchRestaurant() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restaurantdata.onrender.com/states")
      .then((res) => setStates(res.data || []))
      .catch((err) => console.error("Error fetching states:", err));
  }, []);

  const handleStateChange = (e) => {
    const stateVal = e.target.value;
    setSelectedState(stateVal);
    setSelectedCity("");
    setCities([]);

    if (stateVal) {
      setLoadingCities(true);
      axios
        .get(
          `https://restaurantdata.onrender.com/cities/${encodeURIComponent(stateVal)}`,
        )
        .then((res) => {
          setCities(res.data || []);
          setLoadingCities(false);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
          setLoadingCities(false);
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) return;
    navigate(
      `/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`,
    );
  };

  const menuProps = {
    PaperProps: {
      sx: {
        borderRadius: "10px",
        marginTop: "8px",
        boxShadow: "0 8px 24px rgba(16, 40, 81, 0.1)",
        maxHeight: 280,
        "& .MuiList-root": {
          padding: "6px 0",
        },
        "& .MuiMenuItem-root": {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
          color: "#102851",
          padding: "10px 16px",
          "&:hover": {
            backgroundColor: "#f2f8ff",
          },
          "&.Mui-selected": {
            backgroundColor: "#2aa7ff14",
            fontWeight: 600,
            color: "#2aa7ff",
            "&:hover": {
              backgroundColor: "#2aa7ff24",
            },
          },
        },
      },
    },
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <div id="state" className={styles.inputPill}>
        <SearchOutlinedIcon className={styles.inputSearchIcon} />
        <Select
          value={selectedState}
          onChange={handleStateChange}
          displayEmpty
          className={styles.muiSelect}
          IconComponent={ArrowDropDownIcon}
          MenuProps={menuProps}
          inputProps={{ "aria-label": "Select State" }}
        >
          <MenuItem value="" disabled>
            <span className={styles.placeholderText}>State</span>
          </MenuItem>
          {states.map((st) => (
            <MenuItem key={st} value={st}>
              {st}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div id="city" className={styles.inputPill}>
        <SearchOutlinedIcon className={styles.inputSearchIcon} />
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          displayEmpty
          disabled={!selectedState || loadingCities}
          className={styles.muiSelect}
          IconComponent={ArrowDropDownIcon}
          MenuProps={menuProps}
          inputProps={{ "aria-label": "Select City" }}
        >
          <MenuItem value="" disabled>
            <span className={styles.placeholderText}>
              {loadingCities ? "Loading..." : "City"}
            </span>
          </MenuItem>
          {cities.map((ct) => (
            <MenuItem key={ct} value={ct}>
              {ct}
            </MenuItem>
          ))}
        </Select>
      </div>

      <button type="submit" id="searchBtn" className={styles.searchButton}>
        <SearchOutlinedIcon className={styles.btnSearchIcon} />
        <span>Search</span>
      </button>
    </form>
  );
}
