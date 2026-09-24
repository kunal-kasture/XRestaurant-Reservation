import React from "react";

export default function FooterLink({ label, href = "#" }) {
  return (
    <li className="footer-link-item">
      <a href={href} className="footer-anchor">
        › {label}
      </a>
    </li>
  );
}
