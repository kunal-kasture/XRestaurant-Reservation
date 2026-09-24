import React, { useState } from "react";
import styles from "./SmsForms.module.css";

export default function SmsForms() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formRoot}>
      <div className={styles.inputRow}>
        <span className={styles.prefix}>+91</span>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={styles.telInput}
        />
        <button type="submit" className={styles.sendBtn}>
          Send SMS
        </button>
      </div>
      {submitted && (
        <span className={styles.successMsg}>Download link sent!</span>
      )}
    </form>
  );
}
