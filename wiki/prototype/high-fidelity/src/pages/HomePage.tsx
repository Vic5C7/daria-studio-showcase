import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  brand,
  galleryCategories,
  galleryImages,
  homeContent,
  type GalleryCategoryId,
  type Language
} from "../data/siteContent";

type HomePageProps = {
  language: Language;
  onNavigatePricing: () => void;
};

export function HomePage({ language, onNavigatePricing }: HomePageProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(true);
  const [selectedGalleryCategoryId, setSelectedGalleryCategoryId] =
    useState<GalleryCategoryId>("all");

  const filteredGalleryImages = useMemo(
    () =>
      selectedGalleryCategoryId === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.categoryIds.includes(selectedGalleryCategoryId)),
    [selectedGalleryCategoryId]
  );

  const scrollingImages = useMemo(
    () => filteredGalleryImages.length > 0 ? [...filteredGalleryImages, ...filteredGalleryImages] : [],
    [filteredGalleryImages]
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const carousel = carouselRef.current;

      if (!carousel || !isAutoScrollingRef.current) {
        return;
      }

      const loopPoint = carousel.scrollWidth / 2;
      if (loopPoint <= carousel.clientWidth) {
        return;
      }

      carousel.scrollLeft += 1.25;

      if (carousel.scrollLeft >= loopPoint) {
        carousel.scrollLeft -= loopPoint;
      }
    }, 16);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [selectedGalleryCategoryId]);

  const pauseThenResume = () => {
    isAutoScrollingRef.current = false;

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = true;
    }, 3000);
  };

  const scrollGallery = (direction: "previous" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    pauseThenResume();
    const distance = Math.min(carousel.clientWidth * 0.82, 430);
    const loopPoint = carousel.scrollWidth / 2;

    if (direction === "previous" && carousel.scrollLeft < distance) {
      carousel.scrollLeft += loopPoint;
    }

    carousel.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth"
    });
  };

  return (
    <section className="home-page">
      <div className="intro-section">
        <p className="eyebrow">{homeContent.eyebrow[language]}</p>
        <h1>{brand.name[language]}</h1>
        <p className="intro-copy">{brand.intro[language]}</p>
        <button className="primary-action" type="button" onClick={onNavigatePricing}>
          <span>{homeContent.pricingButton[language]}</span>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="section-heading">
          <p>{brand.tagline[language]}</p>
          <h2 id="gallery-title">{homeContent.galleryTitle[language]}</h2>
          <span>{homeContent.galleryIntro[language]}</span>
        </div>

        <div className="gallery-category-row" aria-label={language === "zh" ? "作品分类" : "Gallery categories"}>
          {galleryCategories.map((category) => (
            <button
              className={
                selectedGalleryCategoryId === category.id
                  ? "gallery-category-button is-selected"
                  : "gallery-category-button"
              }
              type="button"
              key={category.id}
              onClick={() => setSelectedGalleryCategoryId(category.id)}
              aria-pressed={selectedGalleryCategoryId === category.id}
            >
              {category.name[language]}
            </button>
          ))}
        </div>

        {scrollingImages.length === 0 ? (
          <div className="gallery-empty-state">{homeContent.galleryEmpty[language]}</div>
        ) : (
          <div className="gallery-carousel">
            <button
              className="gallery-arrow gallery-arrow-left"
              type="button"
              onClick={() => scrollGallery("previous")}
              aria-label={language === "zh" ? "查看上一张作品" : "View previous work"}
            >
              <ArrowLeft size={22} aria-hidden="true" />
            </button>

            <div className="gallery-track" ref={carouselRef}>
              {scrollingImages.map((image, index) => (
                <figure className="gallery-item" key={`${image.src}-${index}`}>
                  <img src={image.src} alt={image.alt[language]} loading="lazy" />
                </figure>
              ))}
            </div>

            <button
              className="gallery-arrow gallery-arrow-right"
              type="button"
              onClick={() => scrollGallery("next")}
              aria-label={language === "zh" ? "查看下一张作品" : "View next work"}
            >
              <ArrowRight size={22} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
    </section>
  );
}
