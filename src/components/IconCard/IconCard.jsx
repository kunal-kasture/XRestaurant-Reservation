import React from "react";

export default function IconCard({ icon, title, active = false }) {
  return (
    <div className={`service-icon-card ${active ? "active-card" : ""}`}>
      <div className="icon-img-wrap">
        <img src={icon} alt={title} className="service-icon-img" />
      </div>
      <p className="icon-label">{title}</p>
    </div>
  );
}
