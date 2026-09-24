import React from "react";
import IconCard from "../IconCard/IconCard";

import restaurantIcon from "../../assets/restaurant.png";
import locationIcon from "../../assets/location-icon.png";
import reservationIcon from "../../assets/reservation-icon.png";
import specialIcon from "../../assets/special-icon.png";
import serviceIcon from "../../assets/service-icon.png";

export default function HeroServices() {
  const categories = [
    { icon: restaurantIcon, title: "Restaurants", active: false },
    { icon: locationIcon, title: "Locations", active: false },
    { icon: reservationIcon, title: "Reservations", active: true },
    { icon: specialIcon, title: "Special Menus", active: false },
    { icon: serviceIcon, title: "Services", active: false },
  ];

  return (
    <div className="hero-services-layout">
      <p className="hero-services-title">You may be looking for</p>
      <div className="hero-services-cards">
        {categories.map((cat, idx) => (
          <IconCard
            key={idx}
            icon={cat.icon}
            title={cat.title}
            active={cat.active}
          />
        ))}
      </div>
    </div>
  );
}
