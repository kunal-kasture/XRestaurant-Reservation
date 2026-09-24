import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./SliderButtons.module.css";

export default function SliderButtons({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}) {
  return (
    <div className={styles.buttonsContainer}>
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
      </button>
      <button
        type="button"
        className={styles.arrowBtn}
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </button>
    </div>
  );
}
