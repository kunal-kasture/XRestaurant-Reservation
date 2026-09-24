import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../components/Footer/Footer";
import defaultRestaurantImg from "../assets/restaurant.png";
import restOffer1 from "../assets/restoffer1.png";
import restOffer2 from "../assets/restoffer2.png";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import styles from "./MyBookings.module.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(saved);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Today";
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const randomAdBanner = useMemo(() => {
    const banners = [restOffer1, restOffer2];
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;
    return bookings.filter((b) => {
      const name =
        b["Restaurant Name"] ||
        b.restaurantName ||
        b["Hospital Name"] ||
        b.name ||
        "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [bookings, searchTerm]);

  return (
    <div className={styles.myBookingsRoot}>
      <div className={styles.blueHeaderBand} />

      <div className={styles.floatingSearchContainer}>
        <div className={styles.searchCard}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>

      <main className={styles.bodyWrapper}>
        <div className={styles.headingSection}>
          <h1 className={styles.pageTitle}>My Bookings</h1>
        </div>

        <div className={styles.contentSplitGrid}>
          <div className={styles.bookingList}>
            {filteredBookings.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No bookings found.</p>
              </div>
            ) : (
              filteredBookings.map((booking, idx) => {
                const name =
                  booking["Restaurant Name"] ||
                  booking.restaurantName ||
                  booking["Hospital Name"] ||
                  booking.name ||
                  "Restaurant";

                const state = booking["State"] || booking.state || "";
                const city = booking["City"] || booking.city || "";
                const address = booking["Address"] || booking.address || "";
                const rating =
                  booking["Restaurant Rating"] ||
                  booking["Hospital overall rating"] ||
                  booking.rating ||
                  "4";

                return (
                  <div
                    key={booking.bookingId || idx}
                    className={styles.bookingCard}
                  >
                    <div className={styles.cardLeft}>
                      <div className={styles.iconWrapper}>
                        <img
                          src={defaultRestaurantImg}
                          alt={name}
                          className={styles.restaurantIcon}
                        />
                      </div>

                      <div className={styles.infoWrapper}>
                        <h3 className={styles.restaurantName}>{name}</h3>
                        <p className={styles.restaurantCity}>
                          {city}, {state}
                        </p>
                        <p className={styles.restaurantAddress}>{address}</p>

                        <div className={styles.ratingBadge}>
                          <ThumbUpAltIcon
                            sx={{ fontSize: 13, color: "#ffffff" }}
                          />
                          <span>{rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.badgesWrapper}>
                      <div className={styles.timeBadge}>
                        {booking.bookingTime || "12:00 PM"}
                      </div>
                      <div className={styles.dateBadge}>
                        {formatDate(booking.bookingDate || booking.date)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
