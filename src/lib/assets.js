const DEFAULT_IMAGE_ASSET_BASE_URL =
  `https://webstepdev.com/demo/webstepnextassets/img`;

const DEFAULTADTYES =
  process.env.NEXT_PUBLIC_MAIN_BASE_URL || "https://webstepdev.com";

export const IMAGE_ASSET_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_ASSET_BASE_URL || DEFAULT_IMAGE_ASSET_BASE_URL
).replace(/\/+$/, "");

export const assetImage = (filename) => {
  const normalizedFilename = String(filename).replace(/^\/+/, "");
  return {
    src: `${IMAGE_ASSET_BASE_URL}/${normalizedFilename}`,
    width: 1200,
    height: 800,
  };
};

export const resolveBlogImage = (image) => {
  if (!image) return assetImage("blog1.png").src;
  if (typeof image === "object" && image.src) return image.src;
  if (typeof image === "string") {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    const cleanName = image.replace(/^\/?img\//, "").replace(/^\/+/, "");
    return `${DEFAULTADTYES}/${cleanName}`;
  }
  return assetImage("blog1.png").src;
};
