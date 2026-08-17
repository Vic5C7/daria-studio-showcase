import { ArrowDown, ArrowUp, ImagePlus, Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  cloneEditableContent,
  makeId,
  placeholderImage,
  type EditableGalleryContent
} from "../data/editableContent";
import type { GalleryImage, Language, StudioModelGallery } from "../data/siteContent";

type GalleryEditorProps = {
  language: Language;
  content: EditableGalleryContent;
  onClose: () => void;
  onSave: (content: EditableGalleryContent) => void;
};

type GalleryEditorTab = "types" | "photos" | "albums";

function getLocalizedLabel(language: Language, zh: string, en: string) {
  return language === "zh" ? zh : en;
}

function GalleryPublishControls({
  language,
  item,
  onChange
}: {
  language: Language;
  item: { isAvailable?: boolean; isVisible?: boolean };
  onChange: (updates: { isAvailable?: boolean; isVisible?: boolean }) => void;
}) {
  const isAvailable = item.isAvailable !== false;
  const isVisible = item.isVisible !== false;

  return (
    <div className="admin-publish-controls">
      <label className="admin-check-field">
        <input
          type="checkbox"
          checked={isAvailable}
          disabled={!isVisible}
          onChange={(event) => onChange({ isAvailable: event.target.checked })}
        />
        <span>{getLocalizedLabel(language, "上架", "Listed")}</span>
      </label>
      <label className="admin-check-field">
        <input
          type="checkbox"
          checked={!isVisible}
          onChange={(event) =>
            onChange({
              isVisible: !event.target.checked,
              isAvailable: event.target.checked ? false : isAvailable
            })
          }
        />
        <span>{getLocalizedLabel(language, "隐藏", "Hidden")}</span>
      </label>
    </div>
  );
}

function createImage(label: string): GalleryImage {
  return {
    src: placeholderImage.src,
    alt: {
      zh: `${label} 图片`,
      en: `${label} image`
    },
    isAvailable: false,
    isVisible: true
  };
}

function createAlbum(): StudioModelGallery {
  const id = makeId("album");
  return {
    id,
    name: {
      zh: "新影集",
      en: "New Album"
    },
    images: [createImage("新影集")],
    isAvailable: false,
    isVisible: true
  };
}

export function GalleryEditor({ language, content, onClose, onSave }: GalleryEditorProps) {
  const [draft, setDraft] = useState<EditableGalleryContent>(() => cloneEditableContent(content));
  const [activeTab, setActiveTab] = useState<GalleryEditorTab>("types");
  const [selectedTypeId, setSelectedTypeId] = useState(draft.serviceTypes[0]?.id ?? "");
  const [selectedAlbumId, setSelectedAlbumId] = useState(draft.studioModelGalleries[0]?.id ?? "");

  const selectedType = draft.serviceTypes.find((serviceType) => serviceType.id === selectedTypeId);
  const selectedImages = selectedTypeId ? draft.imagesByServiceType[selectedTypeId] ?? [] : [];
  const selectedAlbum = draft.studioModelGalleries.find((album) => album.id === selectedAlbumId);

  const updateTypeName = (typeId: string, field: Language, value: string) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceTypes: currentDraft.serviceTypes.map((serviceType) =>
        serviceType.id === typeId
          ? {
              ...serviceType,
              name: {
                ...serviceType.name,
                [field]: value
              }
            }
          : serviceType
      )
    }));
  };

  const moveType = (typeId: string, direction: -1 | 1) => {
    setDraft((currentDraft) => {
      const typeIndex = currentDraft.serviceTypes.findIndex((serviceType) => serviceType.id === typeId);
      const nextIndex = typeIndex + direction;

      if (typeIndex < 0 || nextIndex < 0 || nextIndex >= currentDraft.serviceTypes.length) {
        return currentDraft;
      }

      const serviceTypes = [...currentDraft.serviceTypes];
      [serviceTypes[typeIndex], serviceTypes[nextIndex]] = [serviceTypes[nextIndex], serviceTypes[typeIndex]];

      return {
        ...currentDraft,
        serviceTypes
      };
    });
  };

  const addType = () => {
    const id = makeId("gallery");
    setDraft((currentDraft) => ({
      ...currentDraft,
      serviceTypes: [
        ...currentDraft.serviceTypes,
        {
          id,
          name: {
            zh: "新展示类",
            en: "New Category"
          },
          isAvailable: false,
          isVisible: true
        }
      ],
      imagesByServiceType: {
        ...currentDraft.imagesByServiceType,
        [id]: []
      }
    }));
    setSelectedTypeId(id);
    setActiveTab("types");
  };

  const deleteType = (typeId: string) => {
    const typeToDelete = draft.serviceTypes.find((serviceType) => serviceType.id === typeId);
    const confirmed = window.confirm(
      getLocalizedLabel(
        language,
        `确定删除「${typeToDelete?.name.zh ?? "展示类"}」及其所有照片吗？`,
        `Delete "${typeToDelete?.name.en ?? "category"}" and all of its photos?`
      )
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => {
      const nextImages = { ...currentDraft.imagesByServiceType };
      delete nextImages[typeId];
      const nextTypes = currentDraft.serviceTypes.filter((serviceType) => serviceType.id !== typeId);
      setSelectedTypeId(nextTypes[0]?.id ?? "");

      return {
        ...currentDraft,
        serviceTypes: nextTypes,
        imagesByServiceType: nextImages
      };
    });
  };

  const updateImage = (
    typeId: string,
    imageIndex: number,
    updater: (image: GalleryImage) => GalleryImage
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      imagesByServiceType: {
        ...currentDraft.imagesByServiceType,
        [typeId]: (currentDraft.imagesByServiceType[typeId] ?? []).map((image, index) =>
          index === imageIndex ? updater(image) : image
        )
      }
    }));
  };

  const addImage = () => {
    if (!selectedTypeId) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      imagesByServiceType: {
        ...currentDraft.imagesByServiceType,
        [selectedTypeId]: [
          ...(currentDraft.imagesByServiceType[selectedTypeId] ?? []),
          createImage(selectedType?.name.zh ?? "作品")
        ]
      }
    }));
  };

  const deleteImage = (imageIndex: number) => {
    if (!selectedTypeId) {
      return;
    }

    const confirmed = window.confirm(getLocalizedLabel(language, "确定删除这张照片吗？", "Delete this photo?"));
    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => ({
      ...currentDraft,
      imagesByServiceType: {
        ...currentDraft.imagesByServiceType,
        [selectedTypeId]: (currentDraft.imagesByServiceType[selectedTypeId] ?? []).filter(
          (_, index) => index !== imageIndex
        )
      }
    }));
  };

  const moveImage = (imageIndex: number, direction: -1 | 1) => {
    if (!selectedTypeId) {
      return;
    }

    setDraft((currentDraft) => {
      const images = [...(currentDraft.imagesByServiceType[selectedTypeId] ?? [])];
      const nextIndex = imageIndex + direction;

      if (nextIndex < 0 || nextIndex >= images.length) {
        return currentDraft;
      }

      [images[imageIndex], images[nextIndex]] = [images[nextIndex], images[imageIndex]];

      return {
        ...currentDraft,
        imagesByServiceType: {
          ...currentDraft.imagesByServiceType,
          [selectedTypeId]: images
        }
      };
    });
  };

  const addAlbum = () => {
    const album = createAlbum();
    setDraft((currentDraft) => ({
      ...currentDraft,
      studioModelGalleries: [...currentDraft.studioModelGalleries, album]
    }));
    setSelectedAlbumId(album.id);
    setActiveTab("albums");
  };

  const updateAlbum = (
    albumId: string,
    updater: (album: StudioModelGallery) => StudioModelGallery
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      studioModelGalleries: currentDraft.studioModelGalleries.map((album) =>
        album.id === albumId ? updater(album) : album
      )
    }));
  };

  const deleteAlbum = (albumId: string) => {
    const album = draft.studioModelGalleries.find((studioAlbum) => studioAlbum.id === albumId);
    const confirmed = window.confirm(
      getLocalizedLabel(
        language,
        `确定删除「${album?.name.zh ?? "影集"}」吗？`,
        `Delete "${album?.name.en ?? "album"}"?`
      )
    );

    if (!confirmed) {
      return;
    }

    setDraft((currentDraft) => {
      const nextAlbums = currentDraft.studioModelGalleries.filter((studioAlbum) => studioAlbum.id !== albumId);
      setSelectedAlbumId(nextAlbums[0]?.id ?? "");

      return {
        ...currentDraft,
        studioModelGalleries: nextAlbums
      };
    });
  };

  const addAlbumImage = () => {
    if (!selectedAlbum) {
      return;
    }

    updateAlbum(selectedAlbum.id, (album) => ({
      ...album,
      images: [...album.images, createImage(album.name.zh)]
    }));
  };

  const deleteAlbumImage = (imageIndex: number) => {
    if (!selectedAlbum) {
      return;
    }

    if (selectedAlbum.images.length <= 1) {
      window.alert(getLocalizedLabel(language, "影集至少保留一张照片。", "Keep at least one photo in an album."));
      return;
    }

    const confirmed = window.confirm(getLocalizedLabel(language, "确定删除这张影集照片吗？", "Delete this album photo?"));
    if (!confirmed) {
      return;
    }

    updateAlbum(selectedAlbum.id, (album) => ({
      ...album,
      images: album.images.filter((_, index) => index !== imageIndex)
    }));
  };

  const moveAlbumImage = (imageIndex: number, direction: -1 | 1) => {
    if (!selectedAlbum) {
      return;
    }

    updateAlbum(selectedAlbum.id, (album) => {
      const images = [...album.images];
      const nextIndex = imageIndex + direction;

      if (nextIndex < 0 || nextIndex >= images.length) {
        return album;
      }

      [images[imageIndex], images[nextIndex]] = [images[nextIndex], images[imageIndex]];
      return { ...album, images };
    });
  };

  return (
    <div className="admin-modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-editor-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div>
            <p>{getLocalizedLabel(language, "后台编辑", "Admin Edit")}</p>
            <h2 id="gallery-editor-title">
              {getLocalizedLabel(language, "作品展示管理", "Gallery Management")}
            </h2>
          </div>
          <button className="admin-icon-button" type="button" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="admin-tabs" role="tablist">
          {[
            ["types", getLocalizedLabel(language, "展示类管理", "Categories")],
            ["photos", getLocalizedLabel(language, "照片管理", "Photos")],
            ["albums", getLocalizedLabel(language, "棚拍影集管理", "Studio Albums")]
          ].map(([tabId, label]) => (
            <button
              className={activeTab === tabId ? "admin-tab is-active" : "admin-tab"}
              type="button"
              key={tabId}
              onClick={() => setActiveTab(tabId as GalleryEditorTab)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="admin-modal-body">
          {activeTab === "types" && (
            <div className="admin-stack">
              {draft.serviceTypes.map((serviceType) => (
                <div className="admin-edit-card" key={serviceType.id}>
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveType(serviceType.id, -1)}
                      disabled={draft.serviceTypes[0]?.id === serviceType.id}
                      aria-label={getLocalizedLabel(language, "上移展示类", "Move category up")}
                      title={getLocalizedLabel(language, "上移展示类", "Move category up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveType(serviceType.id, 1)}
                      disabled={draft.serviceTypes[draft.serviceTypes.length - 1]?.id === serviceType.id}
                      aria-label={getLocalizedLabel(language, "下移展示类", "Move category down")}
                      title={getLocalizedLabel(language, "下移展示类", "Move category down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteType(serviceType.id)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{getLocalizedLabel(language, "删除", "Delete")}</span>
                    </button>
                  </div>
                  <div className="admin-edit-row">
                    <label>
                      <span>中文名称</span>
                      <input
                        value={serviceType.name.zh}
                        onChange={(event) => updateTypeName(serviceType.id, "zh", event.target.value)}
                      />
                    </label>
                    <label>
                      <span>English name</span>
                      <input
                        value={serviceType.name.en}
                        onChange={(event) => updateTypeName(serviceType.id, "en", event.target.value)}
                      />
                    </label>
                    <GalleryPublishControls
                      language={language}
                      item={serviceType}
                      onChange={(updates) =>
                        setDraft((currentDraft) => ({
                          ...currentDraft,
                          serviceTypes: currentDraft.serviceTypes.map((currentType) =>
                            currentType.id === serviceType.id ? { ...currentType, ...updates } : currentType
                          )
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
              <button className="admin-add-button" type="button" onClick={addType}>
                <Plus size={18} aria-hidden="true" />
                <span>{getLocalizedLabel(language, "添加展示类", "Add Category")}</span>
              </button>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="admin-stack">
              <label className="admin-field">
                <span>{getLocalizedLabel(language, "选择展示类", "Choose Category")}</span>
                <select value={selectedTypeId} onChange={(event) => setSelectedTypeId(event.target.value)}>
                  {draft.serviceTypes.map((serviceType) => (
                    <option value={serviceType.id} key={serviceType.id}>
                      {serviceType.name[language]}
                    </option>
                  ))}
                </select>
              </label>

              {selectedImages.map((image, imageIndex) => (
                <div className="admin-edit-card" key={`${selectedTypeId}-${imageIndex}`}>
                  <div className="admin-card-actions">
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveImage(imageIndex, -1)}
                      disabled={imageIndex === 0}
                      aria-label={getLocalizedLabel(language, "上移", "Move up")}
                      title={getLocalizedLabel(language, "上移", "Move up")}
                    >
                      <ArrowUp size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-card-order-button"
                      type="button"
                      onClick={() => moveImage(imageIndex, 1)}
                      disabled={imageIndex === selectedImages.length - 1}
                      aria-label={getLocalizedLabel(language, "下移", "Move down")}
                      title={getLocalizedLabel(language, "下移", "Move down")}
                    >
                      <ArrowDown size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="admin-danger-button admin-card-delete-button"
                      type="button"
                      onClick={() => deleteImage(imageIndex)}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      <span>{getLocalizedLabel(language, "删除", "Delete")}</span>
                    </button>
                  </div>
                  <div className="admin-photo-edit-content">
                    <div className="admin-photo-thumbnail">
                      <img src={image.src} alt={image.alt[language]} loading="lazy" />
                    </div>
                    <div className="admin-edit-row admin-edit-row-wide">
                      <label>
                        <span>图片地址</span>
                        <input
                          value={image.src}
                          onChange={(event) =>
                            updateImage(selectedTypeId, imageIndex, (currentImage) => ({
                              ...currentImage,
                              src: event.target.value || placeholderImage.src
                            }))
                          }
                        />
                      </label>
                      <label>
                        <span>中文 alt</span>
                        <input
                          value={image.alt.zh}
                          onChange={(event) =>
                            updateImage(selectedTypeId, imageIndex, (currentImage) => ({
                              ...currentImage,
                              alt: { ...currentImage.alt, zh: event.target.value }
                            }))
                          }
                        />
                      </label>
                      <label>
                        <span>English alt</span>
                        <input
                          value={image.alt.en}
                          onChange={(event) =>
                            updateImage(selectedTypeId, imageIndex, (currentImage) => ({
                              ...currentImage,
                              alt: { ...currentImage.alt, en: event.target.value }
                            }))
                          }
                        />
                      </label>
                      <GalleryPublishControls
                        language={language}
                        item={image}
                        onChange={(updates) =>
                          updateImage(selectedTypeId, imageIndex, (currentImage) => ({
                            ...currentImage,
                            ...updates
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="admin-add-button" type="button" onClick={addImage} disabled={!selectedTypeId}>
                <ImagePlus size={18} aria-hidden="true" />
                <span>{getLocalizedLabel(language, "添加照片", "Add Photo")}</span>
              </button>
            </div>
          )}

          {activeTab === "albums" && (
            <div className="admin-stack">
              <div className="admin-toolbar">
                <select value={selectedAlbumId} onChange={(event) => setSelectedAlbumId(event.target.value)}>
                  {draft.studioModelGalleries.map((album) => (
                    <option value={album.id} key={album.id}>
                      {album.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              {selectedAlbum && (
                <>
                  <div className="admin-edit-card">
                    <div className="admin-card-actions">
                      <GalleryPublishControls
                        language={language}
                        item={selectedAlbum}
                        onChange={(updates) =>
                          updateAlbum(selectedAlbum.id, (album) => ({ ...album, ...updates }))
                        }
                      />
                      <button
                        className="admin-danger-button admin-card-delete-button"
                        type="button"
                        onClick={() => deleteAlbum(selectedAlbum.id)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        <span>{getLocalizedLabel(language, "删除影集", "Delete Album")}</span>
                      </button>
                    </div>
                    <div className="admin-edit-row">
                      <label>
                        <span>中文影集名</span>
                        <input
                          value={selectedAlbum.name.zh}
                          onChange={(event) =>
                            updateAlbum(selectedAlbum.id, (album) => ({
                              ...album,
                              name: { ...album.name, zh: event.target.value }
                            }))
                          }
                        />
                      </label>
                      <label>
                        <span>English album name</span>
                        <input
                          value={selectedAlbum.name.en}
                          onChange={(event) =>
                            updateAlbum(selectedAlbum.id, (album) => ({
                              ...album,
                              name: { ...album.name, en: event.target.value }
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {selectedAlbum.images.map((image, imageIndex) => (
                    <div className="admin-edit-card" key={`${selectedAlbum.id}-${imageIndex}`}>
                      <div className="admin-card-actions">
                        <button
                          className="admin-card-order-button"
                          type="button"
                          onClick={() => moveAlbumImage(imageIndex, -1)}
                          disabled={imageIndex === 0}
                          aria-label={getLocalizedLabel(language, "上移", "Move up")}
                          title={getLocalizedLabel(language, "上移", "Move up")}
                        >
                          <ArrowUp size={16} aria-hidden="true" />
                        </button>
                        <button
                          className="admin-card-order-button"
                          type="button"
                          onClick={() => moveAlbumImage(imageIndex, 1)}
                          disabled={imageIndex === selectedAlbum.images.length - 1}
                          aria-label={getLocalizedLabel(language, "下移", "Move down")}
                          title={getLocalizedLabel(language, "下移", "Move down")}
                        >
                          <ArrowDown size={16} aria-hidden="true" />
                        </button>
                        <button
                          className="admin-danger-button admin-card-delete-button"
                          type="button"
                          onClick={() => deleteAlbumImage(imageIndex)}
                        >
                          <Trash2 size={16} aria-hidden="true" />
                          <span>{getLocalizedLabel(language, "删除", "Delete")}</span>
                        </button>
                      </div>
                      <div className="admin-photo-edit-content">
                        <div className="admin-photo-thumbnail">
                          <img src={image.src} alt={image.alt[language]} loading="lazy" />
                        </div>
                        <div className="admin-edit-row admin-edit-row-wide">
                          <label>
                            <span>图片地址</span>
                            <input
                              value={image.src}
                              onChange={(event) =>
                                updateAlbum(selectedAlbum.id, (album) => ({
                                  ...album,
                                  images: album.images.map((albumImage, index) =>
                                    index === imageIndex
                                      ? { ...albumImage, src: event.target.value || placeholderImage.src }
                                      : albumImage
                                  )
                                }))
                              }
                            />
                          </label>
                          <label>
                            <span>中文 alt</span>
                            <input
                              value={image.alt.zh}
                              onChange={(event) =>
                                updateAlbum(selectedAlbum.id, (album) => ({
                                  ...album,
                                  images: album.images.map((albumImage, index) =>
                                    index === imageIndex
                                      ? { ...albumImage, alt: { ...albumImage.alt, zh: event.target.value } }
                                      : albumImage
                                  )
                                }))
                              }
                            />
                          </label>
                          <label>
                            <span>English alt</span>
                            <input
                              value={image.alt.en}
                              onChange={(event) =>
                                updateAlbum(selectedAlbum.id, (album) => ({
                                  ...album,
                                  images: album.images.map((albumImage, index) =>
                                    index === imageIndex
                                      ? { ...albumImage, alt: { ...albumImage.alt, en: event.target.value } }
                                      : albumImage
                                  )
                                }))
                              }
                            />
                          </label>
                          <GalleryPublishControls
                            language={language}
                            item={image}
                            onChange={(updates) =>
                              updateAlbum(selectedAlbum.id, (album) => ({
                                ...album,
                                images: album.images.map((albumImage, index) =>
                                  index === imageIndex ? { ...albumImage, ...updates } : albumImage
                                )
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="admin-add-button" type="button" onClick={addAlbumImage}>
                    <ImagePlus size={18} aria-hidden="true" />
                    <span>{getLocalizedLabel(language, "添加影集照片", "Add Album Photo")}</span>
                  </button>
                </>
              )}
              <button className="admin-add-button" type="button" onClick={addAlbum}>
                <Plus size={18} aria-hidden="true" />
                <span>{getLocalizedLabel(language, "添加影集", "Add Album")}</span>
              </button>
            </div>
          )}
        </div>

        <div className="admin-modal-footer">
          <button className="admin-secondary-button" type="button" onClick={onClose}>
            {getLocalizedLabel(language, "取消", "Cancel")}
          </button>
          <button className="admin-save-button" type="button" onClick={() => onSave(draft)}>
            <Save size={18} aria-hidden="true" />
            <span>{getLocalizedLabel(language, "保存并预览", "Save Preview")}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
