import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import diningImg from "../../../assets/diningfaq.jpeg";
import styles from "./FAQs.module.css";

const FAQ_ITEMS = [
  {
    q: "How does the reservation system work?",
    a: "Select your desired restaurant, choose an available date and time slot, enter your email, and receive instant confirmation.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Reservations can be managed or canceled anytime via the 'My Bookings' page without cancellation penalties.",
  },
  {
    q: "Do you accommodate special dietary requirements?",
    a: "Yes, you can notify the restaurant staff in advance or upon arrival for tailored preparations.",
  },
  {
    q: "Can I make group reservations?",
    a: "Yes, our partner restaurants accommodate groups of all sizes with advance notice.",
  },
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>GET YOUR ANSWER</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
        </div>

        <div className={styles.splitGrid}>
          <div className={styles.imageCol}>
            <img
              src={diningImg}
              alt="Restaurant Interior"
              className={styles.interiorImg}
            />
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQuestionBtn}
                    onClick={() => toggle(idx)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <RemoveIcon sx={{ color: "#2aa7ff", fontSize: 20 }} />
                    ) : (
                      <AddIcon sx={{ color: "#2aa7ff", fontSize: 20 }} />
                    )}
                  </button>
                  {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
