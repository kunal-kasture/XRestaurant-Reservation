import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import styles from "./BookingModal.module.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  maxWidth: "92%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 3.5,
  outline: "none",
};

export default function BookingModal({
  open,
  onClose,
  bookingDetails,
  onConfirmSuccess,
}) {
  const [email, setEmail] = useState("");

  if (!bookingDetails) return null;

  const { restaurant, date, time } = bookingDetails;
  const restaurantName =
    restaurant?.["Restaurant Name"] ||
    restaurant?.["Hospital Name"] ||
    restaurant?.name ||
    "Austin Food Expo";

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!email) return;

    const saved = JSON.parse(localStorage.getItem("bookings") || "[]");

    const newBooking = {
      ...restaurant,
      "Restaurant Name": restaurantName,
      bookingDate: date,
      bookingTime: time,
      email: email,
      bookingId: Date.now(),
    };

    saved.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(saved));

    setEmail("");
    if (onConfirmSuccess) onConfirmSuccess(newBooking);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h3 className={styles.modalTitle}>Confirm Reservation</h3>
        <p className={styles.restaurantNameHeading}>{restaurantName}</p>

        <div className={styles.detailsBox}>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
        </div>

        <form onSubmit={handleConfirm} className={styles.bookingForm}>
          <label className={styles.inputLabel}>
            Enter your Email
            <input
              type="email"
              required
              placeholder="youremail@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
          </label>

          <div className={styles.btnActions}>
            <button type="submit" className={styles.confirmBtn}>
              Confirm
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
