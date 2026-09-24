import React, { useState } from "react";
import DaySelector from "./DaySelector/DaySelector";
import TimeSlotPicker from "./TimeSlotPicker/TimeSlotPicker";
import styles from "./Calendar.module.css";

function generateUpcomingDays() {
  const list = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else {
      label = d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }

    list.push({
      label,
      dateString: d.toISOString().split("T")[0],
    });
  }
  return list;
}

export default function Calendar({ onSelectBooking }) {
  const days = React.useMemo(() => generateUpcomingDays(), []);
  const [selectedDate, setSelectedDate] = useState(days[0]?.dateString || "");

  const handleSlotPick = (timeSlot) => {
    if (onSelectBooking) {
      onSelectBooking({ date: selectedDate, time: timeSlot });
    }
  };

  return (
    <div className={styles.calendarRoot}>
      <DaySelector
        dates={days}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TimeSlotPicker onSelectSlot={handleSlotPick} />
    </div>
  );
}
