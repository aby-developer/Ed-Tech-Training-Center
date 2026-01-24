import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCode
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* COLUMN 1 – BRAND */}
        <div className="footer-col">
          <div className="footer-brand">
            <img src="/logo.png" alt="Ed Tech Solutions Logo" />
            <h3>Ed Tech Solutions</h3>
          </div>

          <p className="footer-tagline">
            Innovating ICT learning for the future
          </p>

          <div className="footer-socials">
            <a href="https://wa.me/250729598007" target="_blank"><FaWhatsapp /></a>
            <a href="mailto:edtechsolutions@gmail.com"><FaEnvelope /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>

        {/* COLUMN 2 – QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/programs">Programs</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/apply">Apply Now</a></li>
          </ul>
        </div>

        {/* COLUMN 3 – PROGRAMS */}
        <div className="footer-col">
          <h4>Programs</h4>
          <ul>
            <li>Software Development</li>
            <li>Computer Systems & Architecture</li>
            <li>Networking & Internet Technology</li>
            <li>Multimedia Productions</li>
            <li>Electronics & Telecommunications</li>
            <li>Electrical Technology</li>
            <li>Teacher Training Program</li>
            <li>Holiday Program</li>
            <li>Technical Support</li>
            <li>ICT Peripherals Supply</li>
          </ul>
        </div>

        {/* COLUMN 4 – CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>

          <p>
            <FaMapMarkerAlt /> Kigali – Kicukiro, Sonatube
          </p>
          <p>
            <FaPhoneAlt /> +250 789 402 303
          </p>

          <div className="footer-developer">
  <img src="/developer.jpg" alt="Developer" />
  <div>
    <small className="developed-by">Developed by:</small>
    <strong>Abimana Yves</strong>

    <span className="dev-role">
      <FaCode /> Software Developer
    </span>

    <a
      href="https://www.instagram.com/yves.abimana/"
      target="_blank"
      rel="noopener noreferrer"
      className="dev-instagram"
    >
      <FaInstagram /> yves.abimana
    </a>
  </div>
</div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <Link to="/admin/login" className="text-decoration-none">© 2026</Link>  Ed Tech Solutions. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
