import React, { useState } from "react";
import restOffer1 from "../../../assets/restoffer1.png";
import restOffer2 from "../../../assets/restoffer2.png";
import styles from "./Offers.module.css";

const OFFERS_LIST = [
  { id: 1, img: restOffer1, alt: "Special Offer 1" },
  { id: 2, img: restOffer2, alt: "Special Offer 2" },
  { id: 3, img: restOffer1, alt: "Special Offer 3" },
  { id: 4, img: restOffer2, alt: "Special Offer 4" },
  { id: 5, img: restOffer1, alt: "Special Offer 5" },
];

export default function Offers() {
  const [activeDot, setActiveDot] = useState(0);

  const totalSlides = 3;

  return (
    <section className={styles.offersSection}>
      <div className={styles.sliderViewport}>
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${activeDot * 33.33}%)`,
          }}
        >
          {OFFERS_LIST.map((offer) => (
            <div key={offer.id} className={styles.card}>
              <img src={offer.img} alt={offer.alt} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dotsRow}>
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.dot} ${activeDot === idx ? styles.activeDot : ""}`}
            onClick={() => setActiveDot(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
