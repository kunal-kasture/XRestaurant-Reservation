import React from "react";
import HeroServices from "../components/IconLayout/HeroServices";
import Footer from "../components/Footer/Footer";
import chefImg from "../assets/chef.png";
import SearchRestaurant from "../components/SearchRestaurant/SearchRestaurant";

export default function Home() {
  return (
    <div className="home-page-root">
      <section className="hero-section">
        <div className="hero-content-grid">
          <div className="hero-text-block">
            <p className="hero-subheading">Skip the wait! Reserve Online</p>
            <h1 className="hero-main-title">
              Table <span>Reservation</span>
            </h1>
            <p className="hero-description">
              Connect instantly with our platform to reserve tables at your
              favorite restaurants.
            </p>
            <button type="button" className="btn-find-restaurants-hero">
              Find Restaurants
            </button>
          </div>

          <div className="hero-chef-art">
            <img src={chefImg} alt="Chef" className="chef-illustration" />
          </div>
        </div>
      </section>

      <div className="floating-card-wrapper">
        <div className="search-card-container-slot">
          <SearchRestaurant />
          <HeroServices />
        </div>
      </div>

      <Footer />
    </div>
  );
}
