import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Full-size image viewer built on the native <dialog> element, which provides
// focus trapping, Escape-to-close and an inert background for free.
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const item = index === null ? null : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onNavigate]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={item ? item.title : 'Image viewer'}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      {item && (
        <figure className="lightbox__figure">
          <img src={item.image} alt={item.title} />
          <figcaption>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
            <span className="lightbox__count">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close">
        <X size={22} aria-hidden="true" />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => onNavigate(-1)} aria-label="Previous image">
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => onNavigate(1)} aria-label="Next image">
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  );
}
