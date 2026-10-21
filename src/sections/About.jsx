import Reveal from '../components/Reveal.jsx';
import ProfileImage from '../components/ProfileImage.jsx';
import { profile } from '../data/profile.js';
import { aboutImage, categories, projects } from '../data/projects.js';

// Counts are derived from the portfolio data, so they stay accurate as you edit it.
const stats = [
  { value: projects.length, label: 'Pieces showcased' },
  { value: categories.filter((c) => !['featured', 'all'].includes(c.id)).length, label: 'Design disciplines' },
  { value: new Set(projects.flatMap((p) => p.tags)).size, label: 'Styles & formats' },
];

export default function About() {
  const { about } = profile;
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__media">
          {profile.photo ? (
            <ProfileImage className="about__photo" />
          ) : (
            <img className="about__photo" src={aboutImage} alt="Fashion illustration of a woman twirling in a pink lehenga, by Gurjeet Kaur" loading="lazy" />
          )}
          <div className="about__badge">
            <ProfileImage className="profile-image--sm" />
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
          </div>
        </Reveal>

        <div className="about__copy">
          <Reveal>
            <p className="eyebrow">About me</p>
            <h2 id="about-title">{about.heading}</h2>
          </Reveal>
          {about.paragraphs.map((text, i) => (
            <Reveal as="p" key={i} delay={0.05 * (i + 1)}>
              {text}
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <ul className="tags tags--soft" aria-label="Interests">
              {about.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="dl" className="stats" delay={0.25}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
