import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./Accordion.module.css";

export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={styles.accordionHeader}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.questionText}>{question}</span>
        <span className={styles.iconWrapper}>
          {isOpen ? (
            <RemoveIcon sx={{ color: "#2aa7ff" }} />
          ) : (
            <AddIcon sx={{ color: "#2aa7ff" }} />
          )}
        </span>
      </button>
      {isOpen && (
        <div className={styles.accordionBody}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
