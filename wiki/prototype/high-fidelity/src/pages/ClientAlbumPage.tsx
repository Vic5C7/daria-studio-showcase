import {
  ArrowLeft,
  Check,
  Download,
  ImagePlus,
  Images,
  Trash2,
  Upload,
  WandSparkles
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ClientAlbum, ClientAlbumPhoto } from "../data/clientAlbums";
import type { Language } from "../data/siteContent";
import { downloadImagesAsZip, type ZipImageEntry } from "../utils/zipDownload";

type ClientAlbumPageProps = {
  language: Language;
  album: ClientAlbum;
  isAdmin: boolean;
  onBack: () => void;
  onChange: (album: ClientAlbum) => void;
};

function copy(language: Language, zh: string, en: string) {
  return language === "zh" ? zh : en;
}

function formatCount(language: Language, count: number, zhUnit: string, enUnit: string) {
  return language === "zh" ? `${count} ${zhUnit}` : `${count} ${enUnit}`;
}

function makeUploadedPhoto(file: File, index: number): ClientAlbumPhoto {
  const timestamp = Date.now();

  return {
    id: `raw-${timestamp}-${index}`,
    fileName: file.name || `raw-photo-${timestamp}-${index}.jpg`,
    src: URL.createObjectURL(file),
    uploadedAt: new Date().toISOString().slice(0, 10),
    retouchRequested: false,
    retouchNote: ""
  };
}

function photoToZipEntry(photo: ClientAlbumPhoto, index: number): ZipImageEntry {
  return {
    name: photo.fileName || `raw-photo-${index + 1}.jpg`,
    src: photo.src
  };
}

function retouchedToZipEntry(photo: ClientAlbumPhoto, index: number): ZipImageEntry | null {
  if (!photo.retouchedPhoto) {
    return null;
  }

  return {
    name: photo.retouchedPhoto.fileName || `retouched-photo-${index + 1}.jpg`,
    src: photo.retouchedPhoto.src
  };
}

export function ClientAlbumPage({
  language,
  album,
  isAdmin,
  onBack,
  onChange
}: ClientAlbumPageProps) {
  const requestedPhotoIds = useMemo(
    () => album.rawPhotos.filter((photo) => photo.retouchRequested).map((photo) => photo.id),
    [album.rawPhotos]
  );
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);
  const [selectedForRetouch, setSelectedForRetouch] = useState<string[]>(requestedPhotoIds);
  const [retouchNotes, setRetouchNotes] = useState<Record<string, string>>({});
  const [downloadStatus, setDownloadStatus] = useState("");

  const retouchedPhotos = album.rawPhotos.filter((photo) => photo.retouchedPhoto);
  const requestedPhotos = album.rawPhotos.filter((photo) => photo.retouchRequested);

  useEffect(() => {
    setSelectedForDelete([]);
    setSelectedForRetouch(requestedPhotoIds);
    setRetouchNotes(
      Object.fromEntries(album.rawPhotos.map((photo) => [photo.id, photo.retouchNote]))
    );
  }, [album.id, requestedPhotoIds, album.rawPhotos]);

  const updatePhotos = (photos: ClientAlbumPhoto[]) => {
    onChange({
      ...album,
      rawPhotos: photos
    });
  };

  const uploadRawPhotos = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);

    if (files.length === 0) {
      return;
    }

    updatePhotos([
      ...album.rawPhotos,
      ...files.map((file, index) => makeUploadedPhoto(file, index))
    ]);
  };

  const deletePhotos = (photoIds: string[]) => {
    if (photoIds.length === 0) {
      return;
    }

    const shouldDelete = window.confirm(
      copy(
        language,
        `确定删除 ${photoIds.length} 张底片吗？对应的精修申请和精修图也会一起删除。`,
        `Delete ${photoIds.length} raw photo(s)? Matching retouch requests and retouched files will also be removed.`
      )
    );

    if (!shouldDelete) {
      return;
    }

    updatePhotos(album.rawPhotos.filter((photo) => !photoIds.includes(photo.id)));
    setSelectedForDelete([]);
  };

  const uploadRetouchedPhoto = (photoId: string, fileList: FileList | null) => {
    const file = fileList?.[0];

    if (!file) {
      return;
    }

    updatePhotos(
      album.rawPhotos.map((photo) =>
        photo.id === photoId
          ? {
              ...photo,
              retouchedPhoto: {
                id: `retouched-${Date.now()}`,
                fileName: file.name || `${photo.fileName}-retouched.jpg`,
                src: URL.createObjectURL(file),
                uploadedAt: new Date().toISOString().slice(0, 10)
              }
            }
          : photo
      )
    );
  };

  const deleteRetouchedPhoto = (photoId: string) => {
    const shouldDelete = window.confirm(
      copy(language, "确定删除这张精修成片吗？", "Delete this retouched photo?")
    );

    if (!shouldDelete) {
      return;
    }

    updatePhotos(
      album.rawPhotos.map((photo) => {
        if (photo.id !== photoId) {
          return photo;
        }

        const { retouchedPhoto: _retouchedPhoto, ...nextPhoto } = photo;
        return nextPhoto;
      })
    );
  };

  const toggleDeleteSelection = (photoId: string) => {
    setSelectedForDelete((currentSelection) =>
      currentSelection.includes(photoId)
        ? currentSelection.filter((currentPhotoId) => currentPhotoId !== photoId)
        : [...currentSelection, photoId]
    );
  };

  const toggleRetouchSelection = (photoId: string) => {
    setSelectedForRetouch((currentSelection) => {
      if (currentSelection.includes(photoId)) {
        return currentSelection.filter((currentPhotoId) => currentPhotoId !== photoId);
      }

      if (currentSelection.length >= album.retouchQuota) {
        window.alert(
          copy(
            language,
            `最多可申请 ${album.retouchQuota} 张精修。`,
            `You can request up to ${album.retouchQuota} retouched photos.`
          )
        );
        return currentSelection;
      }

      return [...currentSelection, photoId];
    });
  };

  const submitRetouchRequest = () => {
    updatePhotos(
      album.rawPhotos.map((photo) => {
        const isRequested = selectedForRetouch.includes(photo.id);

        return {
          ...photo,
          retouchRequested: isRequested,
          retouchNote: isRequested ? retouchNotes[photo.id] ?? "" : ""
        };
      })
    );
  };

  const downloadZip = async (entries: ZipImageEntry[], fileName: string) => {
    if (entries.length === 0) {
      window.alert(copy(language, "当前没有可下载的照片。", "There are no photos to download yet."));
      return;
    }

    setDownloadStatus(copy(language, "正在打包照片...", "Preparing ZIP..."));

    try {
      await downloadImagesAsZip(entries, fileName);
      setDownloadStatus(copy(language, "下载已开始", "Download started"));
    } catch {
      setDownloadStatus(copy(language, "下载失败，请稍后再试。", "Download failed. Please try again."));
    }
  };

  const rawZipEntries = album.rawPhotos.map(photoToZipEntry);
  const retouchedZipEntries = album.rawPhotos
    .map(retouchedToZipEntry)
    .filter((entry): entry is ZipImageEntry => Boolean(entry));

  return (
    <section className="album-page">
      <div className="workspace-toolbar">
        <button className="back-button" type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>{copy(language, isAdmin ? "返回客户列表" : "返回作品", isAdmin ? "Back to clients" : "Back to gallery")}</span>
        </button>
      </div>

      <div className="workspace-hero album-hero">
        <p>{copy(language, isAdmin ? "客户相册管理" : "我的相册", isAdmin ? "Client album admin" : "My album")}</p>
        <h1>{album.clientName}</h1>
        <div className="album-summary-grid">
          <span>
            <strong>{album.email}</strong>
            <small>{album.phone}</small>
          </span>
          <span>
            <strong>{album.shootTitle}</strong>
            <small>{album.shootDate}</small>
          </span>
          <span>
            <strong>{requestedPhotos.length}/{album.retouchQuota}</strong>
            <small>{copy(language, "已申请精修", "Retouch requested")}</small>
          </span>
        </div>
      </div>

      <section className="album-panel">
        <div className="album-panel-heading">
          <div>
            <p>{copy(language, "底片", "Originals")}</p>
            <h2>{copy(language, "底片相册", "Raw photo album")}</h2>
          </div>
          <div className="album-actions">
            {isAdmin && (
              <>
                <label className="file-upload-button">
                  <ImagePlus size={18} aria-hidden="true" />
                  <span>{copy(language, "上传底片", "Upload raw photos")}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      uploadRawPhotos(event.target.files);
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
                <button
                  className="album-danger-button"
                  type="button"
                  onClick={() => deletePhotos(selectedForDelete)}
                  disabled={selectedForDelete.length === 0}
                >
                  <Trash2 size={18} aria-hidden="true" />
                  <span>{copy(language, "批量删除", "Delete selected")}</span>
                </button>
              </>
            )}
            <button
              className="album-secondary-button"
              type="button"
              onClick={() => downloadZip(rawZipEntries, `${album.id}-raw-photos.zip`)}
            >
              <Download size={18} aria-hidden="true" />
              <span>{copy(language, "下载底片压缩包", "Download raw ZIP")}</span>
            </button>
          </div>
        </div>

        {album.rawPhotos.length === 0 ? (
          <div className="empty-state">{copy(language, "当前相册还没有底片。", "No raw photos yet.")}</div>
        ) : (
          <div className="album-photo-grid">
            {album.rawPhotos.map((photo, photoIndex) => {
              const isSelectedForDelete = selectedForDelete.includes(photo.id);
              const isSelectedForRetouch = selectedForRetouch.includes(photo.id);
              const isOverQuota = !isSelectedForRetouch && selectedForRetouch.length >= album.retouchQuota;

              return (
                <figure
                  className={
                    isSelectedForRetouch || isSelectedForDelete
                      ? "album-photo-card is-selected"
                      : "album-photo-card"
                  }
                  key={photo.id}
                >
                  <img src={photo.src} alt={photo.fileName} loading="lazy" />
                  <figcaption>
                    <strong>{photo.fileName}</strong>
                    <span>{photo.uploadedAt}</span>
                  </figcaption>

                  {isAdmin ? (
                    <>
                      <label className="album-photo-check">
                        <input
                          type="checkbox"
                          checked={isSelectedForDelete}
                          onChange={() => toggleDeleteSelection(photo.id)}
                        />
                        <span>{copy(language, "选择", "Select")}</span>
                      </label>
                      <button
                        className="album-photo-delete"
                        type="button"
                        onClick={() => deletePhotos([photo.id])}
                        aria-label={copy(language, "删除照片", "Delete photo")}
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </>
                  ) : (
                    <div className="retouch-request-controls">
                      <label className="album-photo-check">
                        <input
                          type="checkbox"
                          checked={isSelectedForRetouch}
                          disabled={isOverQuota}
                          onChange={() => toggleRetouchSelection(photo.id)}
                        />
                        <span>{copy(language, "申请精修", "Request retouch")}</span>
                      </label>
                      {isSelectedForRetouch && (
                        <textarea
                          value={retouchNotes[photo.id] ?? ""}
                          onChange={(event) =>
                            setRetouchNotes((currentNotes) => ({
                              ...currentNotes,
                              [photo.id]: event.target.value
                            }))
                          }
                          placeholder={copy(language, "写下希望怎么修这张照片", "Add retouch notes for this photo")}
                        />
                      )}
                    </div>
                  )}
                </figure>
              );
            })}
          </div>
        )}

        {!isAdmin && album.rawPhotos.length > 0 && (
          <div className="album-submit-row">
            <span>
              {copy(language, "已选择", "Selected")} {selectedForRetouch.length}/{album.retouchQuota}
            </span>
            <button className="album-primary-button" type="button" onClick={submitRetouchRequest}>
              <Check size={18} aria-hidden="true" />
              <span>{copy(language, "提交精修申请", "Submit retouch request")}</span>
            </button>
          </div>
        )}
      </section>

      <section className="album-panel">
        <div className="album-panel-heading">
          <div>
            <p>{copy(language, "精修", "Retouching")}</p>
            <h2>{copy(language, isAdmin ? "客户精修申请" : "精修成片", isAdmin ? "Retouch requests" : "Retouched photos")}</h2>
          </div>
          <button
            className="album-secondary-button"
            type="button"
            onClick={() => downloadZip(retouchedZipEntries, `${album.id}-retouched-photos.zip`)}
          >
            <Download size={18} aria-hidden="true" />
            <span>{copy(language, "下载精修压缩包", "Download retouched ZIP")}</span>
          </button>
        </div>

        {requestedPhotos.length === 0 ? (
          <div className="empty-state">
            {copy(language, "客户还没有提交精修申请。", "No retouch requests have been submitted.")}
          </div>
        ) : (
          <div className="retouch-pair-list">
            {requestedPhotos.map((photo, requestIndex) => (
              <article className="retouch-pair-card" key={photo.id}>
                <div className="retouch-pair-media">
                  <div>
                    <span>{copy(language, "申请精修的底片", "Requested raw photo")}</span>
                    <img src={photo.src} alt={photo.fileName} loading="lazy" />
                  </div>
                  <div>
                    <span>{copy(language, "对应精修成片", "Matching retouched photo")}</span>
                    {photo.retouchedPhoto ? (
                      <img src={photo.retouchedPhoto.src} alt={photo.retouchedPhoto.fileName} loading="lazy" />
                    ) : (
                      <div className="retouch-empty">
                        <WandSparkles size={22} aria-hidden="true" />
                        {copy(language, "待上传", "Pending upload")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="retouch-pair-detail">
                  <strong>
                    {copy(language, "第", "Request")} {requestIndex + 1}
                    {language === "zh" ? " 张" : ""}
                  </strong>
                  <p>{photo.retouchNote || copy(language, "客户未填写备注。", "No client note.")}</p>
                  {isAdmin && (
                    <div className="album-actions">
                      <label className="file-upload-button">
                        <Upload size={18} aria-hidden="true" />
                        <span>{copy(language, photo.retouchedPhoto ? "替换精修图" : "上传精修图", photo.retouchedPhoto ? "Replace retouched" : "Upload retouched")}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            uploadRetouchedPhoto(photo.id, event.target.files);
                            event.currentTarget.value = "";
                          }}
                        />
                      </label>
                      {photo.retouchedPhoto && (
                        <button
                          className="album-danger-button"
                          type="button"
                          onClick={() => deleteRetouchedPhoto(photo.id)}
                        >
                          <Trash2 size={18} aria-hidden="true" />
                          <span>{copy(language, "删除精修图", "Delete retouched")}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {downloadStatus && <p className="album-download-status">{downloadStatus}</p>}
      </section>
    </section>
  );
}

