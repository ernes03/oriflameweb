import React, { useEffect, useState } from "react";
import slidesData from "./data/heroshot.json";
import "./HeroShot.css";

// Base pública (CRA)
const PUBLIC_BASE = (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL) || "";

// Normaliza y asegura "/" inicial respetando PUBLIC_URL
function withBase(p) {
  const base = String(PUBLIC_BASE || "").replace(/\/+$/, "");
  const path = `/${String(p || "").replace(/^\/+/, "")}`;
  return `${base}${path}`.replace(/\/+/g, "/");
}

// Mapa de assets empaquetados desde src/media (Webpack/CRA)
const mediaMap = (() => {
  try {
    const ctx = require.context("./media", true, /\.(png|jpe?g|webp|svg)$/i);
    const map = {};
    ctx.keys().forEach((key) => {
      const url = ctx(key);
      const name = key.split("/").pop();          // "HeroImage2.jpg"
      const rel = `media/${key.replace(/^.\//, "")}`; // "media/sub/Hero.jpg"
      if (name && !map[name]) map[name] = url;    // por nombre simple
      if (!map[rel]) map[rel] = url;              // por ruta relativa con "media/"
    });
    return map;
  } catch {
    return {};
  }
})();

// Genera candidatos válidos para <img src=...>
function resolveImageCandidates(name) {
  if (!name) return [];
  // URL absoluta
  if (/^https?:\/\//i.test(name)) return [name];

  const out = [];

  // 1) Empaquetadas desde src/media
  if (mediaMap[name]) out.push(mediaMap[name]);            // "HeroImage2.jpg"
  if (mediaMap[`media/${name}`]) out.push(mediaMap[`media/${name}`]); // "media/HeroImage2.jpg"
  if (name.includes("/") && mediaMap[name]) out.push(mediaMap[name]); // "media/sub/Hero.jpg"

  // 2) Rutas absolutas o relativas -> a públicas
  if (name.startsWith("/")) {
    out.push(withBase(name));
  } else if (name.includes("/")) {
    out.push(withBase(name));               // p.ej. "media/HeroImage2.jpg"
  } else {
    out.push(withBase(`media/${name}`));    // public/media
    out.push(withBase(`images/${name}`));   // public/images
    out.push(withBase(name));               // raíz pública
  }

  // Únicos y en orden
  return Array.from(new Set(out));
}

function HeroShot() {
  const slides = slidesData.slides || [];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Fallback entre candidatos (media -> public/media -> public/images -> raíz)
  const [imgAttempt, setImgAttempt] = useState(0);
  useEffect(() => setImgAttempt(0), [index]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const STAY_MS = 7000; // antes: 3500 -> más tiempo visible
    const FADE_MS = 3000; // antes: 2500 -> debe coincidir con CSS (3s)

    let t1, t2;
    const loop = () => {
      t1 = setTimeout(() => {
        setVisible(false); // fade out
        t2 = setTimeout(() => {
          setIndex((i) => (i + 1) % slides.length); // siguiente slide
          setVisible(true); // fade in
          loop();
        }, FADE_MS);
      }, STAY_MS);
    };

    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [slides.length]);

  const slide = slides[index] || {};

  const bgClass =
    slide.background?.enabled
      ? slide.background.type === "image"
        ? "hero-shot--bg-image"
        : slide.background.type === "color"
        ? "hero-shot--bg-color"
        : ""
      : "";

  const bgStyle =
    slide.background?.enabled && slide.background.type === "image"
      ? {
          "--hero-bg-image": `url('${slide.background.imageUrl}')`,
          "--hero-bg-base": slide.background.baseColor || "#0f264d",
          ...(typeof slide.background.overlay === "string"
            ? { "--hero-bg-overlay": slide.background.overlay }
            : {})
        }
      : slide.background?.enabled && slide.background.type === "color"
      ? {
          "--hero-bg-color": slide.background.color,
          "--hero-bg-base": slide.background.color
        }
      : {};

  const contentClasses = [
    "hero-shot__content",
    slide.reverse ? "is-reversed" : "",
    slide.imageTop ? "is-imageTop" : "",
    slide.close ? "is-close" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const imageName = slide.image || slide.image2;
  const candidates = resolveImageCandidates(imageName);
  const imgSrc = candidates[imgAttempt];

  return (
    <section
      className={`hero-shot ${bgClass} fade ${visible ? "in" : "out"}`}
      style={bgStyle}
    >
      <div className="hero-shot__stage">
        <div className={contentClasses}>
          <div className="hero-shot__messages">
            <div className="hero-shot__text-container">
              <div className="hero-shot__title-section">
                {slide.headline && (
                  <h2 className="hero-shot__headline">{slide.headline}</h2>
                )}
                {slide.subheadline && (
                  <p className="hero-shot__subheadline">{slide.subheadline}</p>
                )}
              </div>

              {Array.isArray(slide.messages) && slide.messages.length > 0 && (
                <ul className="hero-shot__bullets">
                  {slide.messages.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {imgSrc && (
            <div className="hero-shot__imageWrapper">
              <img
                className="hero-shot__image"
                src={imgSrc}
                alt={slide.imageAlt || ""}
                loading="lazy"
                onError={() => {
                  if (imgAttempt < candidates.length - 1) {
                    setImgAttempt((n) => n + 1);
                  } else {
                    // eslint-disable-next-line no-console
                    console.error("[HeroShot] no se pudo cargar:", imageName, candidates);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroShot;


