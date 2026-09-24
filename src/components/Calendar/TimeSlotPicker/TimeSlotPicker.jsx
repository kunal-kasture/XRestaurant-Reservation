import React from "react";
import styles from "./TimeSlotPicker.module.css";

const SLOTS = {
  Morning: ["11:30 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM"],
  Evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"],
};

export default function TimeSlotPicker({ onSelectSlot }) {
  return (
    <div className={styles.slotPickerRoot}>
      {Object.entries(SLOTS).map(([period, timeList]) => (
        <div key={period} className={styles.periodRow}>
          <span className={styles.periodLabel}>{period}</span>
          <div className={styles.slotList}>
            {timeList.map((time) => (
              <button
                key={time}
                type="button"
                className={styles.slotBtn}
                onClick={() => onSelectSlot(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
