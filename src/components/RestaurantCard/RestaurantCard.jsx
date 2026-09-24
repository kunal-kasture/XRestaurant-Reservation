import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import styles from "./RestaurantCard.module.css";
import defaultRestaurantImg from "../../assets/restaurant.png";

export default function RestaurantCard({ restaurant, onBook }) {
  const name =
    restaurant["Restaurant Name"] ||
    restaurant["Hospital Name"] ||
    restaurant.name ||
    "Austin Food Expo";

  const state = restaurant["State"] || restaurant.state || "";
  const city = restaurant["City"] || restaurant.city || "";
  const address = restaurant["Address"] || restaurant.address || "";
  const rating =
    restaurant["Restaurant Rating"] ||
    restaurant["Hospital overall rating"] ||
    restaurant.rating ||
    "4";

  return (
    <div className={styles.cardContainer}>
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

        <p className={styles.feeLine}>
          <span className={styles.freeText}>FREE</span>{" "}
          <span className={styles.strikeFee}>₹500</span> Registration fee
        </p>

        <div className={styles.dashedDivider} />

        <div className={styles.ratingBadge}>
          <ThumbUpAltIcon sx={{ fontSize: 13, color: "#ffffff" }} />
          <span>{rating}</span>
        </div>
      </div>

      <div className={styles.actionWrapper}>
        <span className={styles.availableText}>Available Today</span>
        <button
          type="button"
          className={styles.bookBtn}
          onClick={() => onBook && onBook(restaurant)}
        >
          Book FREE Reservation
        </button>
      </div>
    </div>
  );
}
