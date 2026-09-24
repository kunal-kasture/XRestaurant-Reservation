import React from "react";
import FooterLink from "./FooterLink";

import restaurantLogo from "../../assets/restaurant-logo.png";
import fbIcon from "../../assets/fb.png";
import twitterIcon from "../../assets/twitter.png";
import ytIcon from "../../assets/yt.png";
import pinterestIcon from "../../assets/pinterest.png";

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-brand-column">
          <div className="footer-logo-wrap">
            <img
              src={restaurantLogo}
              alt="Restaurant Logo"
              className="footer-logo-img"
            />
          </div>
          <div className="footer-social-icons">
            <a href="#fb">
              <img src={fbIcon} alt="Facebook" />
            </a>
            <a href="#twitter">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="#yt">
              <img src={ytIcon} alt="YouTube" />
            </a>
            <a href="#pinterest">
              <img src={pinterestIcon} alt="Pinterest" />
            </a>
          </div>
        </div>

        <ul className="footer-links-column">
          <FooterLink label="About Our Restaurant" />
          <FooterLink label="Menu" />
          <FooterLink label="Photo Gallery" />
          <FooterLink label="Contact Us" />
          <FooterLink label="Terms of Service" />
        </ul>

        <ul className="footer-links-column">
          <FooterLink label="Reservations" />
          <FooterLink label="Special Events" />
          <FooterLink label="Private Dining" />
          <FooterLink label="Customer Support" />
          <FooterLink label="Gift Cards" />
        </ul>

        <ul className="footer-links-column">
          <FooterLink label="Our Cuisine" />
          <FooterLink label="Wine List" />
          <FooterLink label="Chef's Special" />
          <FooterLink label="Catering Services" />
          <FooterLink label="Loyalty Program" />
        </ul>
      </div>

      <div className="footer-copyright">
        <p>Copyright ©2025 FineDining.com. All Rights Reserved</p>
      </div>
    </footer>
  );
}
