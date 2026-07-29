import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  brand,
  galleryImagesByServiceType,
  galleryServiceTypes,
  homeContent,
  type GalleryServiceTypeId,
  type Language
} from "../data/siteContent";

type HomePageProps = {
  language: Language;
  onNavigatePricing: () => void;
};

export function HomePage({ language, onNavigatePricing }: HomePageProps) {
  const [selectedGalleryTypeId, setSelectedGalleryTypeId] = useState<GalleryServiceTypeId>("graduation");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(true);
  const selectedGalleryImages = galleryImagesByServiceType[selectedGalleryTypeId];
  const scrollingImages = useMemo(
    () => [...selectedGalleryImages, ...selectedGalleryImages],
    [selectedGalleryImages]
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

    isAutoScrollingRef.current = true;
  }, [selectedGalleryTypeId]);

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
        </div>

        <div
          className="gallery-filter"
          role="tablist"
          aria-label={language === "zh" ? "选择作品服务类型" : "Choose gallery service type"}
        >
          {galleryServiceTypes.map((serviceType) => {
            const isSelected = selectedGalleryTypeId === serviceType.id;

            return (
              <button
                className={
                  isSelected
                    ? "gallery-filter-button is-selected"
                    : "gallery-filter-button"
                }
                type="button"
                role="tab"
                key={serviceType.id}
                onClick={() => setSelectedGalleryTypeId(serviceType.id)}
                aria-selected={isSelected}
              >
                <span>{serviceType.name[language]}</span>
              </button>
            );
          })}
        </div>

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
      </section>
    </section>
  );
}
