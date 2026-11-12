import { SITE_CONFIG } from "../config/siteConfig.js";

const DEFAULT_IMAGE_ASSET_BASE_URL =
  SITE_CONFIG.defaultAssetBaseUrl || "https://webstepsolutions.com/webstepassets/img";

const DEFAULT_ADMIN_BASE_URL =
  process.env.NEXT_PUBLIC_PHP_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://webstepsolutions.com/admin";

export const IMAGE_ASSET_BASE_URL = (
  process.env.NEXT_PUBLIC_IMAGE_ASSET_BASE_URL || DEFAULT_IMAGE_ASSET_BASE_URL
).replace(/\/+$/, "");

export const ADMIN_BASE_URL = DEFAULT_ADMIN_BASE_URL.replace(/\/+$/, "");

/**
 * Static frontend images resolver (e.g. logo, banner, icons)
 * Resolves to: https://webstepsolutions.com/webstepassets/img/<filename>
 */
export const assetImage = (filename) => {
  const normalizedFilename = String(filename || "").replace(/^\/+/, "").replace(/^img\//, "");
  return {
    src: `${IMAGE_ASSET_BASE_URL}/${normalizedFilename}`,
    width: 1200,
    height: 800,
  };
};

/**
 * Universal dynamic image resolver for Admin uploads and static fallbacks
 * - If full URL (http/https): returns untouched
 * - If admin upload (/admin/uploads/..., uploads/...): resolves to https://webstepsolutions.com/admin/uploads/...
 * - If static filename: resolves to https://webstepsolutions.com/webstepassets/img/<filename>
 */
export const resolveDynamicImage = (image, fallback = "blog1.png") => {
  if (!image) return assetImage(fallback).src;
  if (typeof image === "object" && image.src) return image.src;
  
  if (typeof image === "string") {
    const trimmed = image.trim();
    if (!trimmed) return assetImage(fallback).src;

    // 1. Full absolute URL (e.g. https://webstepsolutions.com/admin/uploads/blog/xxx.webp)
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    // 2. Admin upload path (e.g. /admin/uploads/..., admin/uploads/..., /uploads/...)
    if (trimmed.includes("uploads/")) {
      const cleanUpload = trimmed.replace(/^\/?admin\/?/, "").replace(/^\/+/, "");
      return `${ADMIN_BASE_URL}/${cleanUpload}`;
    }

    // 3. Static frontend asset (e.g. "dr-treat-case.png", "img/logo.png", "logo.png")
    const cleanName = trimmed.replace(/^\/?img\//, "").replace(/^\/+/, "");
    return `${IMAGE_ASSET_BASE_URL}/${cleanName}`;
  }

  return assetImage(fallback).src;
};

export const resolveBlogImage = (image) => resolveDynamicImage(image, "blog1.png");
export const resolvePortfolioImage = (image, fallback = "dr-treat-case.png") => resolveDynamicImage(image, fallback);
export const resolveCaseStudyImage = (image, fallback = "dr-treat-case.png") => resolveDynamicImage(image, fallback);
