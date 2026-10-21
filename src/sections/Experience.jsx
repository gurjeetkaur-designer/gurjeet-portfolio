import { Briefcase, GraduationCap } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { education, experience } from '../data/experience.js';

function Timeline({ icon: Icon, title, items }) {
  return (
    <div className="timeline-col">
      <h3 className="timeline-col__title">
        <Icon size={20} aria-hidden="true" /> {title}
      </h3>
      <ol className="timeline">
        {items.map((entry, i) => (
          <Reveal as="li" key={`${entry.title}-${i}`} className="timeline__item" delay={i * 0.08}>
            <span className="timeline__period">{entry.period}</span>
            <h4>{entry.title}</h4>
            <p className="timeline__org">{entry.org}</p>
            <p>{entry.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section section--tinted" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" eyebrow="Journey" title="Experience & education" />
        <div className="timeline-grid">
          <Timeline icon={Briefcase} title="Experience" items={experience} />
          <Timeline icon={GraduationCap} title="Education & certifications" items={education} />
        </div>
      </div>
    </section>
  );
}
