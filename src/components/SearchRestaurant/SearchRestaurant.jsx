import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Select, MenuItem } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./SearchRestaurant.module.css";

export default function SearchRestaurant() {
  const [searchParams] = useSearchParams();
  const urlState = searchParams.get("state") || "";
  const urlCity = searchParams.get("city") || "";

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(urlState);
  const [selectedCity, setSelectedCity] = useState(urlCity);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restaurantdata.onrender.com/states")
      .then((res) => setStates(res.data || []))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  useEffect(() => {
    if (urlState) {
      setSelectedState(urlState);
      axios
        .get(
          `https://restaurantdata.onrender.com/cities/${encodeURIComponent(urlState)}`,
        )
        .then((res) => {
          setCities(res.data || []);
          if (urlCity) {
            setSelectedCity(urlCity);
          }
        })
        .catch((err) => console.error("Error loading cities:", err));
    }
  }, [urlState, urlCity]);

  const handleStateChange = (e) => {
    const stateVal = e.target.value;
    setSelectedState(stateVal);
    setSelectedCity("");

    if (stateVal) {
      axios
        .get(
          `https://restaurantdata.onrender.com/cities/${encodeURIComponent(stateVal)}`,
        )
        .then((res) => {
          setCities(res.data || []);
        })
        .catch((err) => {
          console.error("Error loading cities:", err);
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
        "& .MuiMenuItem-root": {
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
          color: "#102851",
          padding: "10px 16px",
          "&:hover": { backgroundColor: "#f2f8ff" },
          "&.Mui-selected": {
            backgroundColor: "#2aa7ff14",
            fontWeight: 600,
            color: "#2aa7ff",
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
          className={styles.muiSelect}
          IconComponent={ArrowDropDownIcon}
          MenuProps={menuProps}
        >
          <MenuItem value="" disabled>
            <span className={styles.placeholderText}>City</span>
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
