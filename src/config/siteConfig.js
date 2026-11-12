// =============================================================================
// WEBSTEP SOLUTIONS CONFIGURATION (PRODUCTION LIVE)
// Domain: https://webstepsolutions.com
// =============================================================================

export const SITE_CONFIG = {
  basePath: "",
  
  // Asset images: static frontend assets reside under /webstepassets/img/
  defaultAssetBaseUrl: process.env.NEXT_PUBLIC_IMAGE_ASSET_BASE_URL || "https://webstepsolutions.com/webstepassets/img",
    
  // Main production domain
  siteUrl: process.env.NEXT_PUBLIC_MAIN_BASE_URL || "https://webstepsolutions.com",
};

export const IS_DEMO = false;
export const ENABLE_DEMO_PATH = false;

export default SITE_CONFIG;
