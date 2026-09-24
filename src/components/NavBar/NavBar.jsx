import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import restaurantLogo from "../../assets/restaurant-logo.png";

const TABLET_MAX_WIDTH = 1024;

export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);

  const checkFit = useCallback(() => {
    const nav = navRef.current;
    const links = linksRef.current;
    if (!nav || !links) return;

    const items = Array.from(links.children);
    if (items.length === 0) {
      setIsCollapsed(false);
      return;
    }

    const navStyle = window.getComputedStyle(nav);
    const horizontalPadding =
      parseFloat(navStyle.paddingLeft) + parseFloat(navStyle.paddingRight);
    const navGap = parseFloat(navStyle.columnGap) || 0;
    const linksGap =
      parseFloat(window.getComputedStyle(links).gap) || 0;

    const needed =
      items.reduce(
        (total, item) => total + item.getBoundingClientRect().width,
        0
      ) +
      linksGap * (items.length - 1);

    let available = nav.clientWidth - horizontalPadding - navGap;
    if (logoRef.current) {
      available -= logoRef.current.getBoundingClientRect().width;
    }
    if (buttonRef.current) {
      available -= buttonRef.current.getBoundingClientRect().width;
    }

    const fits = needed <= available;
    setIsCollapsed(window.innerWidth <= TABLET_MAX_WIDTH && !fits);
  }, []);

  useLayoutEffect(() => {
    checkFit();
    window.addEventListener("resize", checkFit);
    return () => window.removeEventListener("resize", checkFit);
  }, [checkFit]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [isCollapsed]);

  useEffect(() => {
    if (!isCollapsed) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCollapsed]);

  const navClassName = `${styles.mainNav}${
    isCollapsed ? ` ${styles.mainNavCollapsed}` : ""
  }`;
  const navLinksClassName = `${styles.navLinks}${
    isMenuOpen ? ` ${styles.isOpen}` : ""
  }`;

  return (
    <header className={styles.navWrapper}>
      <div className={styles.topNoticeBar}>
        Stay updated with the latest restaurants and maximize your dining
        experience with our platform
      </div>
      <nav ref={navRef} className={navClassName}>
        <Link to="/" className={styles.brandLogo} ref={logoRef}>
          <img
            src={restaurantLogo}
            alt="Restaurant Logo"
            className={styles.logoImg}
          />
        </Link>
        {isCollapsed && (
          <button
            ref={buttonRef}
            type="button"
            className={styles.hamburgerBtn}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`${styles.hamburgerIcon}${
                isMenuOpen ? ` ${styles.hamburgerOpen}` : ""
              }`}
            >
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </span>
          </button>
        )}
        <div
          ref={linksRef}
          className={navLinksClassName}
          onClick={(event) => {
            if (event.target.closest("a")) setIsMenuOpen(false);
          }}
        >
          <Link to="/search" className={styles.navLink}>
            Find Restaurants
          </Link>
          <a href="#locations" className={styles.navLink}>
            Locations
          </a>
          <a href="#reservations" className={styles.navLink}>
            Reservations
          </a>
          <a href="#special-menus" className={styles.navLink}>
            Special Menus
          </a>
          <a href="#software" className={styles.navLink}>
            Restaurant Management Software
          </a>
          <a href="#services" className={styles.navLink}>
            Services
          </a>
          <Link to="/my-bookings" className={styles.myBookingsBtn}>
            My Bookings
          </Link>
        </div>
      </nav>
    </header>
  );
}