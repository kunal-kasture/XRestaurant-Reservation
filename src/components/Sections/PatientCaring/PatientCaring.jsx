import React from "react";
import restaurantLogo from "../../../assets/restaurant-logo.png";
import tickBlue from "../../../assets/tick-blue.png";
import styles from "./PatientCaring.module.css";

const POINTS = [
  "Easy Online Booking",
  "Special Occasion Planning",
  "Instant Confirmation",
];

export default function PatientCaring() {
  return (
    <section className={styles.sectionRoot}>
      <div className={styles.container}>
        <div className={styles.emblemColumn}>
          <img
            src={restaurantLogo}
            alt="Restaurant Food & Drinks"
            className={styles.logoImg}
          />
        </div>

        <div className={styles.contentColumn}>
          <span className={styles.tagline}>
            EXPERIENCE FINE DINING AT ITS BEST
          </span>
          <h2 className={styles.mainHeading}>
            Table <span>Reservation</span>
          </h2>
          <p className={styles.description}>
            We make dining memorable with our seamless reservation system. Book
            your perfect table and enjoy an exceptional culinary experience with
            impeccable service.
          </p>

          <ul className={styles.checkList}>
            {POINTS.map((pt, idx) => (
              <li key={idx} className={styles.checkItem}>
                <img
                  src={tickBlue}
                  alt="Verified"
                  className={styles.tickIcon}
                />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
