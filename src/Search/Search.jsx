import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchRestaurant from "../components/SearchRestaurant/SearchRestaurant";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import Footer from "../components/Footer/Footer";
import styles from "./Search.module.css";
import restOffer1 from "../assets/restoffer1.png";
import restOffer2 from "../assets/restoffer2.png";

export default function Search() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const randomAdBanner = useMemo(() => {
    const banners = [restOffer1, restOffer2];
    return banners[Math.floor(Math.random() * banners.length)];
  }, [state, city]);

  useEffect(() => {
    if (state && city) {
      setLoading(true);
      axios
        .get(
          `https://restaurantdata.onrender.com/restaurants?state=${encodeURIComponent(
            state,
          )}&city=${encodeURIComponent(city)}`,
        )
        .then((res) => {
          setRestaurants(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching restaurants:", err);
          setLoading(false);
        });
    }
  }, [state, city]);

  return (
    <div className={styles.searchPageRoot}>
      <div className={styles.blueHeaderBand} />

      <div className={styles.floatingSearchContainer}>
        <div className={styles.searchCard}>
          <SearchRestaurant />
        </div>
      </div>

      <main className={styles.searchBodyWrapper}>
        {city && (
          <div className={styles.headingSection}>
            <h1 className={styles.resultsHeading}>
              {loading
                ? "Searching..."
                : `${restaurants.length} restaurants available in ${city}`}
            </h1>
            <p className={styles.verifiedSubtitle}>
              <CheckCircleOutlineIcon className={styles.verifiedIcon} />
              <span>
                Book tables with minimum wait-time & verified restaurant details
              </span>
            </p>
          </div>
        )}

        <div className={styles.contentSplitGrid}>
          <div className={styles.restaurantList}>
            {loading && (
              <p className={styles.loadingText}>Loading restaurants...</p>
            )}

            {!loading && restaurants.length === 0 && city && (
              <p className={styles.noResultsText}>
                No restaurants found in {city}, {state}.
              </p>
            )}

            {!loading &&
              restaurants.map((restaurant, idx) => (
                <RestaurantCard
                  key={restaurant["Restaurant ID"] || restaurant.id || idx}
                  restaurant={restaurant}
                />
              ))}
          </div>

          <aside className={styles.adBannerSidebar}>
            <img
              src={randomAdBanner}
              alt="Special Restaurant Offer"
              className={styles.adImage}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
