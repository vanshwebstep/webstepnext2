import React from 'react';
import Blog from '@/components/Blog/Blog';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("blog");
  return {
    title: dynamicSeo.title || "Web Development Insights, Guides & Trends | Webstep Solutions Blog",
    description: dynamicSeo.description || "Practical guides, architecture deep-dives, and performance tips on WordPress, Shopify, React, Next.js, and Laravel from the Webstep Solutions team.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/blog/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Blog />
    </>
  );
}
