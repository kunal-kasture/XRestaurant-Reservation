import React from "react";
import teamImg from "../../../assets/restaurant-team.png";
import styles from "./OurFamilies.module.css";

export default function OurFamilies() {
  return (
    <section className={styles.sectionRoot}>
      <div className={styles.container}>
        <div className={styles.textSide}>
          <span className={styles.tagline}>RESERVE YOUR DINING EXPERIENCE</span>
          <h2 className={styles.heading}>Table Booking</h2>
          <p className={styles.description}>
            Discover the perfect dining experience at our restaurant. From
            intimate dinners to special celebrations, we offer seamless
            reservations that ensure your dining experience is exactly as you
            envision. Our attentive staff is ready to accommodate your
            preferences and dietary requirements.
          </p>
        </div>

        <div className={styles.imageSide}>
          <img
            src={teamImg}
            alt="Hospitality Team"
            className={styles.teamPhoto}
          />
        </div>
      </div>
    </section>
  );
}
