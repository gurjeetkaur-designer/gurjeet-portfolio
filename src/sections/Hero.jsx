import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProfileImage from '../components/ProfileImage.jsx';
import { profile } from '../data/profile.js';
import { brands, heroImages } from '../data/projects.js';

const ease = [0.22, 1, 0.36, 1];
const item = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p className="pill" {...item(0.05)}>
            <Sparkles size={14} aria-hidden="true" /> {profile.role}
          </motion.p>

          <motion.h1 id="hero-title" {...item(0.15)}>
            Hi, I’m <em>{profile.name}.</em>
          </motion.h1>

          <motion.p className="hero__tagline" {...item(0.25)}>
            {profile.tagline}
          </motion.p>

          <motion.p className="hero__intro" {...item(0.32)}>
            {profile.intro}
          </motion.p>

          <motion.div className="hero__actions" {...item(0.4)}>
            <a href="#projects" className="btn btn--primary">
              Explore My Work <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Contact Me
            </a>
          </motion.div>

          <motion.div className="hero__meta" {...item(0.5)}>
            <ProfileImage className="profile-image--sm" />
            <p>
              <span>Designed for</span>
              {brands.slice(0, 3).join(' · ')}
            </p>
          </motion.div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <motion.img
            src={heroImages.main}
            alt=""
            className="hero__img hero__img--main"
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          />
          <motion.img
            src={heroImages.secondary}
            alt=""
            className="hero__img hero__img--secondary"
            initial={{ opacity: 0, x: -30, rotate: 0 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          />
          <motion.img
            src={heroImages.accent}
            alt=""
            className="hero__img hero__img--accent"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          />
          <motion.span
            className="hero__chip hero__chip--a"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Festive campaigns
          </motion.span>
          <motion.span
            className="hero__chip hero__chip--b"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Illustration
          </motion.span>
        </div>
      </div>
    </section>
  );
}
