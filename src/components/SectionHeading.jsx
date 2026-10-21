import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, intro, id, align = 'center' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </Reveal>
  );
}
