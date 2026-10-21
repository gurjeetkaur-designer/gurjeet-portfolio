import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { skills, tools } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" className="section section--tinted" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="What I do"
          title="Skills & services"
          intro="From a single festive post to a complete wedding suite — design that feels personal, polished and on-brand."
        />

        <ul className="skills-grid">
          {skills.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} className="skill-card" delay={(i % 4) * 0.06}>
              <span className="skill-card__icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>

        {tools.length > 0 && (
          <Reveal className="tools">
            <span>Tools</span>
            <ul className="tags">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
