import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2 } from 'lucide-react';

export default function ProjectCard({ project, onOpen }) {
  const { title, description, image, tags, link } = project;

  return (
    <motion.article
      layout
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button type="button" className="project-card__media" onClick={onOpen} aria-label={`View ${title} full size`}>
        <img src={image} alt={title} loading="lazy" decoding="async" />
        <span className="project-card__zoom" aria-hidden="true">
          <Maximize2 size={18} />
        </span>
      </button>

      <div className="project-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="tags" aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {link ? (
          <a className="project-card__link" href={link} target="_blank" rel="noopener noreferrer">
            View project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <button type="button" className="project-card__link" onClick={onOpen}>
            View project <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.article>
  );
}
