export type RetouchedPhoto = {
  id: string;
  fileName: string;
  src: string;
  uploadedAt: string;
};

export type ClientAlbumPhoto = {
  id: string;
  fileName: string;
  src: string;
  uploadedAt: string;
  retouchRequested: boolean;
  retouchNote: string;
  retouchedPhoto?: RetouchedPhoto;
};

export type ClientAlbum = {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  shootTitle: string;
  shootDate: string;
  retouchQuota: number;
  rawPhotos: ClientAlbumPhoto[];
};

const demoUploadedAt = "2026-08-10";

function createDemoPhoto(clientId: string, index: number): ClientAlbumPhoto {
  const photoNumber = String(index).padStart(2, "0");

  return {
    id: `${clientId}-raw-${photoNumber}`,
    fileName: `${clientId}-raw-${photoNumber}.jpg`,
    src: `images/models/model-${photoNumber}.jpg`,
    uploadedAt: demoUploadedAt,
    retouchRequested: index <= 2,
    retouchNote:
      index === 1
        ? "希望皮肤自然一点，背景里的路人可以淡化。"
        : index === 2
          ? "保留裙摆细节，整体色调可以更明亮。"
          : ""
  };
}

export function makeAlbumIdFromEmail(email: string) {
  return email.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function createDefaultClientAlbums(): ClientAlbum[] {
  const clientAlbumId = makeAlbumIdFromEmail("client@qq.com");
  const secondAlbumId = makeAlbumIdFromEmail("amy@qq.com");
  const thirdAlbumId = makeAlbumIdFromEmail("rachel@qq.com");

  return [
    {
      id: clientAlbumId,
      clientName: "Client Demo",
      email: "client@qq.com",
      phone: "+61 400 000 001",
      shootTitle: "墨尔本大学毕业照",
      shootDate: "2026-08-08",
      retouchQuota: 9,
      rawPhotos: Array.from({ length: 6 }, (_, index) => createDemoPhoto(clientAlbumId, index + 1))
    },
    {
      id: secondAlbumId,
      clientName: "Amy Chen",
      email: "amy@qq.com",
      phone: "+61 400 000 002",
      shootTitle: "注册结婚跟拍",
      shootDate: "2026-08-02",
      retouchQuota: 5,
      rawPhotos: Array.from({ length: 4 }, (_, index) => createDemoPhoto(secondAlbumId, index + 3))
    },
    {
      id: thirdAlbumId,
      clientName: "Rachel Li",
      email: "rachel@qq.com",
      phone: "+61 400 000 003",
      shootTitle: "早鸟棚拍套餐",
      shootDate: "2026-07-28",
      retouchQuota: 9,
      rawPhotos: Array.from({ length: 3 }, (_, index) => createDemoPhoto(thirdAlbumId, index + 5))
    }
  ].map((album) => ({
    ...album,
    rawPhotos: album.rawPhotos.map((photo, photoIndex) =>
      photoIndex === 0
        ? {
            ...photo,
            retouchedPhoto: {
              id: `${photo.id}-retouched`,
              fileName: `${photo.id}-retouched.jpg`,
              src: photo.src,
              uploadedAt: "2026-08-11"
            }
          }
        : photo
    )
  }));
}

