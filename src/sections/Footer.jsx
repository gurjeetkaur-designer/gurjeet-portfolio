import { ArrowUp } from 'lucide-react';
import SocialLinks from '../components/SocialLinks.jsx';
import { navLinks } from '../data/navigation.js';
import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a href="#home" className="footer__logo">
            {profile.name}
            <span aria-hidden="true">.</span>
          </a>
          <p>{profile.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks includeEmail className="social-links--light" />
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a href="#home" className="footer__top">
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
