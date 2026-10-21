import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Lightbox from '../components/Lightbox.jsx';
import { categories, projects } from '../data/projects.js';

// Cards shown per "page"; "Show more" reveals the next batch.
const PAGE_SIZE = 12;

function filterProjects(category) {
  if (category === 'all') return projects;
  if (category === 'featured') return projects.filter((p) => p.featured);
  return projects.filter((p) => p.category === category);
}

const counts = Object.fromEntries(categories.map(({ id }) => [id, filterProjects(id).length]));

export default function Projects() {
  const [category, setCategory] = useState(categories[0].id);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);
  const filtered = useMemo(() => filterProjects(category), [category]);
  const visible = filtered.slice(0, limit);

  const selectCategory = (id) => {
    setCategory(id);
    setLimit(PAGE_SIZE);
  };

  // The lightbox browses the whole filtered set, not just the cards on screen.
  const navigate = useCallback(
    (step) => setOpenIndex((i) => (i + step + filtered.length) % filtered.length),
    [filtered.length],
  );
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Portfolio"
          title="Selected work"
          intro="Brand campaigns, social media creatives, wedding stationery, logos and illustrations. Tap any piece to view it full size."
        />

        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`filter ${category === id ? 'is-active' : ''}`}
              aria-pressed={category === id}
              onClick={() => selectCategory(id)}
            >
              {label} <span className="filter__count">{counts[id]}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {filtered.length} projects
        </p>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard key={project.image} project={project} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </div>

        {visible.length < filtered.length && (
          <div className="projects-more">
            <p>
              Showing {visible.length} of {filtered.length}
            </p>
            <button type="button" className="btn btn--ghost" onClick={() => setLimit((n) => n + PAGE_SIZE)}>
              Show more <ChevronDown size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <Lightbox items={filtered} index={openIndex} onClose={close} onNavigate={navigate} />
    </section>
  );
}
