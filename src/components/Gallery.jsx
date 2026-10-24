import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { config } from "../config";
import { PhotoMark } from "./Ornaments";

export default function Gallery() {
  const photos = config.gallery;
  const [broken, setBroken] = useState({});
  const [active, setActive] = useState(null);

  const usable = photos
    .map((photo, index) => ({ ...photo, index }))
    .filter((photo) => photo.src && !broken[photo.index]);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActive((current) => {
          const open = photos
            .map((photo, index) => ({ ...photo, index }))
            .filter((photo) => photo.src && !broken[photo.index]);
          const at = open.findIndex((photo) => photo.index === current);
          if (at < 0 || open.length === 0) return current;
          return open[(at + direction + open.length) % open.length].index;
        });
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, broken, photos]);

  const current = usable.find((photo) => photo.index === active);
  const currentPlace = usable.findIndex((photo) => photo.index === active);

  function step(direction) {
    if (usable.length === 0) return;
    const at = currentPlace < 0 ? 0 : currentPlace;
    setActive(usable[(at + direction + usable.length) % usable.length].index);
  }

  return (
    <section className="block gallery-block">
      <h2 className="section-title">Photo Gallery</h2>
      <div className="gallery-grid">
        {photos.map((photo, index) => {
          const ready = photo.src && !broken[index];
          if (!ready) {
            return (
              <div className="shot shot-empty" key={index}>
                <PhotoMark />
                <span>Your photo</span>
              </div>
            );
          }
          return (
            <button
              key={index}
              type="button"
              className="shot"
              onClick={() => setActive(index)}
              aria-label={`Open ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ objectPosition: photo.position || "50% 50%" }}
                onError={() => setBroken((prev) => ({ ...prev, [index]: true }))}
              />
            </button>
          );
        })}
      </div>

      {current
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Photo gallery"
              onClick={() => setActive(null)}
            >
              <button type="button" className="lb-close" onClick={() => setActive(null)} aria-label="Close">
                ✕
              </button>
              <div className="lb-count">
                {currentPlace + 1} / {usable.length}
              </div>
              <div className="lb-stage" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="lb-nav lb-prev" onClick={() => step(-1)} aria-label="Previous image">
                  ‹
                </button>
                <img src={current.src} alt={current.alt} className="lb-photo" />
                <button type="button" className="lb-nav lb-next" onClick={() => step(1)} aria-label="Next image">
                  ›
                </button>
              </div>
              <div className="lb-thumbs" onClick={(event) => event.stopPropagation()}>
                {usable.map((photo) => (
                  <button
                    key={photo.index}
                    type="button"
                    className={photo.index === active ? "is-on" : ""}
                    onClick={() => setActive(photo.index)}
                    aria-label={`View image ${photo.index + 1}`}
                    aria-current={photo.index === active ? "true" : undefined}
                  >
                    <img src={photo.src} alt="" />
                  </button>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
