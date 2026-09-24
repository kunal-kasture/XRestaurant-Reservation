import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import whiteTickIcon from "../assets/tick.png";
import SearchRestaurant from "../components/SearchRestaurant/SearchRestaurant";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import BookingModal from "../components/BookingModal/BookingModal";
import Footer from "../components/Footer/Footer";
import styles from "./Search.module.css";
import restOffer1 from "../assets/restoffer1.png";
import restOffer2 from "../assets/restoffer2.png";
import AutohideSnackbar from "../components/AutohideSnackbar/AutohideSnackbar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleConfirmSuccess = () => {
    setSnackbarOpen(true);
  };

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

  const handleOpenSlot = ({ restaurant, date, time }) => {
    setActiveBooking({ restaurant, date, time });
    setIsModalOpen(true);
  };

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
              <img
                src={whiteTickIcon}
                alt="White Tick Icon"
                className={styles.whiteTick}
              />
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
                  onSelectSlot={handleOpenSlot}
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

      <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={activeBooking}
        onConfirmSuccess={handleConfirmSuccess}
      />

      <AutohideSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message="Reservation booked successfully!"
      />

      <Footer />
    </div>
  );
}
