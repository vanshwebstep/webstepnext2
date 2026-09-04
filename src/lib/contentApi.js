// lib/contentApi.js
// Replace your existing contentApi.js with this file
// Connects your Next.js frontend to the PHP backend

const BASE_URL = (
  process.env.NEXT_PUBLIC_PHP_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  `${process.env.NEXT_PUBLIC_MAIN_BASE_URL || "https://webstepdev.com"}/webstepphp`
).replace(/\/+$/, '');

const CONTENT_ENDPOINTS = {
  packages: '/api/packages.php',
  portfolio: '/api/portfolio.php',
  'case-studies': '/api/case-studies.php',
  blogs: '/api/blogs.php',
};

/**
 * Fetch blogs list and categories from /api/blogs.php
 */
export async function fetchBlogs(fallback = { categories: [], blogs: [] }) {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs.php`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return {
      categories: data.categories || fallback.categories || [],
      blogs: data.blogs || data.data || fallback.blogs || [],
    };
  } catch (err) {
    console.warn('[contentApi] fetchBlogs failed, using fallback:', err.message);
    return fallback;
  }
}

/**
 * Fetch single blog by slug from /api/blogs.php?slug=...
 */
export async function fetchBlogBySlug(slug, fallback = null) {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs.php?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (!data.blog && !data.data) throw new Error('Blog not found in API response');
    return {
      blog: data.blog || data.data,
      related: data.related || [],
    };
  } catch (err) {
    console.warn('[contentApi] fetchBlogBySlug failed, using fallback:', err.message);
    return fallback ? { blog: fallback, related: [] } : null;
  }
}

/**
 * Fetch packages directly from /api/packages.php
 */
export async function fetchPackages(pageType = 'packages', fallback = { packages: [] }) {
  try {
    const res = await fetch(`${BASE_URL}/api/packages.php?page=${encodeURIComponent(pageType)}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return {
      packages: data.packages || data.data || fallback.packages || [],
      tabs: data.tabs || fallback.tabs || [],
    };
  } catch (err) {
    console.warn('[contentApi] fetchPackages failed, using fallback:', err.message);
    return fallback;
  }
}

/**
 * Fetch packages and tabs for the Packages component
 * Drop-in replacement - returns { tabs, packages } in same shape
 */
export async function fetchContent(type, fallback) {
  const endpoint = CONTENT_ENDPOINTS[type];
  if (!endpoint) return fallback;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: 'no-store', // always fresh
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return { ...fallback, ...data };
  } catch (err) {
    console.warn('[contentApi] fetchContent failed, using fallback:', err.message);
    return fallback;
  }
}

/**
 * Fetch custom builder options for CustomizePackage component
 * Returns { websiteType, pages, design, features } arrays
 */
export async function fetchCustomOptions() {
  try {
    const res = await fetch(`${BASE_URL}/api/custom-options.php`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('API error');
    return res.json();
  } catch (err) {
    console.warn('[contentApi] fetchCustomOptions failed:', err.message);
    return null; // caller should use FALLBACK
  }
}

export async function fetchServicePage(slug, fallback) {
  try {
    const res = await fetch(`${BASE_URL}/api/service-page.php?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'API error');
    return { ...fallback, ...data.data };
  } catch (err) {
    console.warn('[contentApi] fetchServicePage failed, using fallback:', err.message);
    return fallback;
  }
}

/**
 * Submit a website lead from contact, quote, experts, or custom package forms.
 */
export async function submitLead(payload) {
  const res = await fetch(`${BASE_URL}/api/submit-custom.php`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Submission failed');
  return data;
}

/**
 * Submit a "Choose Plan" inquiry from the Packages page
 */
export async function submitPlanInquiry(payload) {
  const res = await fetch(`${BASE_URL}/api/submit-inquiry.php`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Submission failed');
  return data;
}

export async function submitNewsletter(payload) {
  const res = await fetch(`${BASE_URL}/api/newsletter.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Subscription failed');
  return data;
}

/**
 * Fetch dynamic SEO metadata from the PHP backend.
 * @param {string} pageUrl - The URL slug/path (e.g., 'about', '/', 'services')
 * @returns {Promise<{title?: string, description?: string, keywords?: string}>}
 */
export async function fetchSeoMetadata(pageUrl) {
  try {
    const res = await fetch(`${BASE_URL}/api/seo.php?page_url=${encodeURIComponent(pageUrl)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return {};
    const json = await res.json();
    if (json.success && json.data) {
      const { title, description, keywords } = json.data;
      return {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(keywords ? { keywords } : {}),
      };
    }
    return {};
  } catch (err) {
    console.warn(`[contentApi] fetchSeoMetadata failed for ${pageUrl}:`, err.message);
    return {};
  }
}
