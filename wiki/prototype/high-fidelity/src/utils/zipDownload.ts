export type ZipImageEntry = {
  name: string;
  src: string;
};

const crcTable = new Uint32Array(256);

for (let tableIndex = 0; tableIndex < 256; tableIndex += 1) {
  let value = tableIndex;

  for (let bitIndex = 0; bitIndex < 8; bitIndex += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }

  crcTable[tableIndex] = value >>> 0;
}

function getCrc32(bytes: Uint8Array) {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function getDosDateParts(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  return { dosDate, dosTime };
}

function makeHeader(length: number, writer: (view: DataView) => void) {
  const bytes = new Uint8Array(length);
  writer(new DataView(bytes.buffer));
  return bytes;
}

function concatBytes(parts: Uint8Array[]) {
  const totalLength = parts.reduce((total, part) => total + part.byteLength, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;

  for (const part of parts) {
    merged.set(part, offset);
    offset += part.byteLength;
  }

  return merged;
}

function sanitizeFileName(fileName: string, fallbackName: string) {
  const normalizedName = fileName.trim().replace(/[\\/:*?"<>|]+/g, "-");
  return normalizedName || fallbackName;
}

async function readImageBytes(src: string) {
  const response = await fetch(new URL(src, window.location.href));

  if (!response.ok) {
    throw new Error(`Unable to fetch ${src}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}

export async function downloadImagesAsZip(entries: ZipImageEntry[], zipFileName: string) {
  if (entries.length === 0) {
    return false;
  }

  const encoder = new TextEncoder();
  const fileParts: Uint8Array[] = [];
  const centralDirectoryParts: Uint8Array[] = [];
  const { dosDate, dosTime } = getDosDateParts();
  let localOffset = 0;

  for (const [entryIndex, entry] of entries.entries()) {
    const safeName = sanitizeFileName(entry.name, `photo-${entryIndex + 1}.jpg`);
    const nameBytes = encoder.encode(safeName);
    const imageBytes = await readImageBytes(entry.src);
    const crc = getCrc32(imageBytes);
    const size = imageBytes.byteLength;
    const currentLocalOffset = localOffset;

    const localHeader = makeHeader(30, (view) => {
      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(6, 0, true);
      view.setUint16(8, 0, true);
      view.setUint16(10, dosTime, true);
      view.setUint16(12, dosDate, true);
      view.setUint32(14, crc, true);
      view.setUint32(18, size, true);
      view.setUint32(22, size, true);
      view.setUint16(26, nameBytes.byteLength, true);
      view.setUint16(28, 0, true);
    });

    fileParts.push(localHeader, nameBytes, imageBytes);
    localOffset += localHeader.byteLength + nameBytes.byteLength + imageBytes.byteLength;

    const centralHeader = makeHeader(46, (view) => {
      view.setUint32(0, 0x02014b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(6, 20, true);
      view.setUint16(8, 0, true);
      view.setUint16(10, 0, true);
      view.setUint16(12, dosTime, true);
      view.setUint16(14, dosDate, true);
      view.setUint32(16, crc, true);
      view.setUint32(20, size, true);
      view.setUint32(24, size, true);
      view.setUint16(28, nameBytes.byteLength, true);
      view.setUint16(30, 0, true);
      view.setUint16(32, 0, true);
      view.setUint16(34, 0, true);
      view.setUint16(36, 0, true);
      view.setUint32(38, 0, true);
      view.setUint32(42, currentLocalOffset, true);
    });

    centralDirectoryParts.push(centralHeader, nameBytes);
  }

  const centralDirectoryOffset = localOffset;
  const centralDirectory = concatBytes(centralDirectoryParts);
  const endOfCentralDirectory = makeHeader(22, (view) => {
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(4, 0, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, entries.length, true);
    view.setUint16(10, entries.length, true);
    view.setUint32(12, centralDirectory.byteLength, true);
    view.setUint32(16, centralDirectoryOffset, true);
    view.setUint16(20, 0, true);
  });

  const zipBytes = concatBytes([...fileParts, centralDirectory, endOfCentralDirectory]);
  const blob = new Blob([zipBytes], { type: "application/zip" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = sanitizeFileName(zipFileName, "photos.zip");
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);

  return true;
}

