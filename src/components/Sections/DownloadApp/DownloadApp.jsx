import React, { useState } from "react";
import appImg from "../../../assets/dining-app.png";
import playStoreIcon from "../../../assets/playstore.png";
import appStoreIcon from "../../../assets/apple-logo.png";
import downArrow from "../../../assets/down-arr.png";
import styles from "./DownloadApp.module.css";

export default function DownloadApp() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.sectionRoot}>
      <div className={styles.container}>
        <div className={styles.mobileColumn}>
          <img
            src={appImg}
            alt="Mobile App Mockup"
            className={styles.mobileImg}
          />
        </div>

        <div className={styles.textColumn}>
          <div className={styles.headingWrapper}>
            <img
              src={downArrow}
              alt="Curved Down Arrow"
              className={styles.arrowDown}
            />
            <h2 className={styles.heading}>
              Download the <br />
              <span>Restaurant Booking</span> <br />
              App
            </h2>
          </div>

          <p className={styles.instructions}>
            Enter your phone number to receive the link to install the app.
          </p>

          <form onSubmit={handleSubmit} className={styles.smsForm}>
            <div className={styles.inputContainer}>
              <span className={styles.prefix}>+91</span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.phoneInput}
              />
              <button type="submit" className={styles.sendBtn}>
                Send SMS
              </button>
            </div>
          </form>

          <div className={styles.storeRow}>
            <button type="button" className={styles.storeBadge}>
              <img
                src={playStoreIcon}
                alt="PlayStore Icon"
                className={styles.storeIcon}
              />
              <div className={styles.badgeText}>
                <span className={styles.small}>GET IT ON</span>
                <span className={styles.bold}>Google Play</span>
              </div>
            </button>

            <button type="button" className={styles.storeBadge}>
              <img
                src={appStoreIcon}
                alt="AppStore Icon"
                className={styles.storeIcon}
              />
              <div className={styles.badgeText}>
                <span className={styles.small}>Download on the</span>
                <span className={styles.bold}>App Store</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
