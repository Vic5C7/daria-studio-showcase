import { ArrowLeft, ArrowRight, Pencil, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GalleryEditor } from "../components/GalleryEditor";
import type { EditableGalleryContent } from "../data/editableContent";
import {
  brand,
  homeContent,
  type GalleryServiceTypeId,
  type Language,
  type StudioModelId
} from "../data/siteContent";

type HomePageProps = {
  language: Language;
  content: EditableGalleryContent;
  isAdmin: boolean;
  onChange: (content: EditableGalleryContent) => void;
  onNavigatePricing: () => void;
};

export function HomePage({ language, content, isAdmin, onChange, onNavigatePricing }: HomePageProps) {
  const [selectedGalleryTypeId, setSelectedGalleryTypeId] = useState<GalleryServiceTypeId>("graduation");
  const [expandedStudioAlbumId, setExpandedStudioAlbumId] = useState<StudioModelId | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(true);
  const isStudioGallery = selectedGalleryTypeId === "studio-shoot";
  const expandedStudioAlbum =
    content.studioModelGalleries.find((studioAlbum) => studioAlbum.id === expandedStudioAlbumId) ?? null;
  const selectedGalleryImages = content.imagesByServiceType[selectedGalleryTypeId] ?? [];
  const scrollingImages = useMemo(
    () => [...selectedGalleryImages, ...selectedGalleryImages],
    [selectedGalleryImages]
  );

  useEffect(() => {
    if (!content.serviceTypes.some((serviceType) => serviceType.id === selectedGalleryTypeId)) {
      setSelectedGalleryTypeId(content.serviceTypes[0]?.id ?? "");
      setExpandedStudioAlbumId(null);
    }
  }, [content.serviceTypes, selectedGalleryTypeId]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const carousel = carouselRef.current;

      if (!carousel || !isAutoScrollingRef.current || isStudioGallery) {
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
  }, [isStudioGallery]);

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

  useEffect(() => {
    if (!expandedStudioAlbum) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedStudioAlbumId(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedStudioAlbum]);

  const selectGalleryType = (galleryTypeId: GalleryServiceTypeId) => {
    setSelectedGalleryTypeId(galleryTypeId);
    setExpandedStudioAlbumId(null);
  };

  const toggleStudioAlbum = (studioAlbumId: StudioModelId) => {
    setExpandedStudioAlbumId((currentAlbumId) =>
      currentAlbumId === studioAlbumId ? null : studioAlbumId
    );
  };

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
        <div className="section-heading-row">
          <div className="section-heading">
            <p>{brand.tagline[language]}</p>
            <h2 id="gallery-title">{homeContent.galleryTitle[language]}</h2>
          </div>
          {isAdmin && (
            <button
              className="admin-edit-button"
              type="button"
              onClick={() => setIsEditorOpen(true)}
              aria-label={language === "zh" ? "编辑作品展示" : "Edit gallery"}
            >
              <Pencil size={18} aria-hidden="true" />
              <span>{language === "zh" ? "编辑" : "Edit"}</span>
            </button>
          )}
        </div>

        <div className="gallery-controls">
          <div
            className="gallery-filter"
            role="tablist"
            aria-label={language === "zh" ? "选择作品服务类型" : "Choose gallery service type"}
          >
            {content.serviceTypes.map((serviceType) => {
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
                  onClick={() => selectGalleryType(serviceType.id)}
                  aria-selected={isSelected}
                >
                  <span>{serviceType.name[language]}</span>
                </button>
              );
            })}
          </div>

        </div>

        {isStudioGallery ? (
          <div className="studio-gallery-view">
            <div className="studio-album-grid" aria-label={homeContent.studioModelLabel[language]}>
              {content.studioModelGalleries.map((studioAlbum) => {
                const isExpanded = expandedStudioAlbumId === studioAlbum.id;
                const coverImage = studioAlbum.images[0];
                const photoCount =
                  language === "zh"
                    ? `${studioAlbum.images.length} 张`
                    : `${studioAlbum.images.length} photos`;

                return (
                  <button
                    className={isExpanded ? "studio-album-card is-expanded" : "studio-album-card"}
                    type="button"
                    key={studioAlbum.id}
                    onClick={() => toggleStudioAlbum(studioAlbum.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${studioAlbum.id}-gallery`}
                  >
                    {studioAlbum.images.slice(1, 4).map((image, stackIndex) => (
                      <span
                        className={`studio-album-stack studio-album-stack-${stackIndex + 1}`}
                        key={`${studioAlbum.id}-stack-${stackIndex}`}
                        aria-hidden="true"
                      >
                        <img src={image.src} alt="" loading="lazy" />
                      </span>
                    ))}
                    {coverImage && (
                      <span className="studio-album-cover">
                        <img src={coverImage.src} alt={coverImage.alt[language]} loading="lazy" />
                      </span>
                    )}
                    <span className="studio-album-meta">
                      <span>{studioAlbum.name[language]}</span>
                      <small>{photoCount}</small>
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
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
              {scrollingImages.length > 0 ? (
                scrollingImages.map((image, index) => (
                  <figure className="gallery-item" key={`${image.src}-${index}`}>
                    <img src={image.src} alt={image.alt[language]} loading="lazy" />
                  </figure>
                ))
              ) : (
                <div className="empty-state">{language === "zh" ? "暂无作品照片。" : "No gallery photos yet."}</div>
              )}
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

      {expandedStudioAlbum && (
        <div
          className="studio-album-overlay"
          onClick={() => setExpandedStudioAlbumId(null)}
          role="presentation"
        >
          <div
            className="studio-album-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${expandedStudioAlbum.id}-title`}
            id={`${expandedStudioAlbum.id}-gallery`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="studio-album-modal-header">
              <div>
                <p>{homeContent.studioModelLabel[language]}</p>
                <h3 id={`${expandedStudioAlbum.id}-title`}>
                  {expandedStudioAlbum.name[language]}
                </h3>
              </div>
              <button
                className="studio-album-close"
                type="button"
                onClick={() => setExpandedStudioAlbumId(null)}
                aria-label={language === "zh" ? "关闭影集" : "Close album"}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="studio-album-modal-grid">
              {expandedStudioAlbum.images.map((image, imageIndex) => (
                <figure
                  className="studio-album-modal-photo"
                  key={`${expandedStudioAlbum.id}-photo-${imageIndex}`}
                >
                  <img src={image.src} alt={image.alt[language]} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
      {isEditorOpen && (
        <GalleryEditor
          language={language}
          content={content}
          onClose={() => setIsEditorOpen(false)}
          onSave={(nextContent) => {
            onChange(nextContent);
            setIsEditorOpen(false);
          }}
        />
      )}
    </section>
  );
}
