import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./DaySelector.module.css";

export default function DaySelector({
  selectedDate,
  onSelectDate,
  dates = [],
}) {
  const [startIndex, setStartIndex] = React.useState(0);
  const visibleDaysCount = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(dates.length - visibleDaysCount, prev + 1),
    );
  };

  const visibleDates = dates.slice(startIndex, startIndex + visibleDaysCount);

  return (
    <div className={styles.daySelectorRoot}>
      <button
        type="button"
        className={styles.navArrowBtn}
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
      </button>

      <div className={styles.datesContainer}>
        {visibleDates.map((item, idx) => {
          const isSelected = selectedDate === item.dateString;
          return (
            <div
              key={item.dateString || idx}
              className={`${styles.dateTab} ${isSelected ? styles.activeTab : ""}`}
              onClick={() => onSelectDate(item.dateString)}
            >
              <span className={styles.dayTitle}>{item.label}</span>
              <span className={styles.slotsAvailable}>10 slots available</span>
              {isSelected && <div className={styles.activeIndicator} />}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={styles.navArrowBtn}
        onClick={handleNext}
        disabled={startIndex >= dates.length - visibleDaysCount}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
      </button>
    </div>
  );
}
