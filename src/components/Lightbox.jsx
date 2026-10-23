import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function Media({ item }) {
  if (item.video) {
    // Keyed so moving to another video restarts playback instead of reusing the element.
    return <video key={item.video} src={item.video} poster={item.image} controls autoPlay playsInline controlsList="nodownload noremoteplayback" disablePictureInPicture />;
  }
  if (item.gallery) {
    return (
      <div className="lightbox__slides" key={item.title}>
        {item.gallery.map((src, i) => (
          <img key={src} src={src} alt={`${item.title} — slide ${i + 1} of ${item.gallery.length}`} />
        ))}
      </div>
    );
  }
  return <img src={item.image} alt={item.title} />;
}

// Full-size image and video viewer built on the native <dialog> element, which
// provides focus trapping, Escape-to-close and an inert background for free.
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
      aria-label={item ? item.title : 'Viewer'}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      {item && (
        <figure className="lightbox__figure">
          <Media item={item} />
          <figcaption>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
            {item.gallery && <span className="lightbox__hint">Scroll sideways to see all {item.gallery.length} slides</span>}
            <span className="lightbox__count">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close" autoFocus>
        <X size={22} aria-hidden="true" />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => onNavigate(-1)} aria-label="Previous">
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => onNavigate(1)} aria-label="Next">
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </>
      )}
    </dialog>
  );
}
