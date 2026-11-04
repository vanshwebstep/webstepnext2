import React from 'react';
import FullStack from '@/components/Fullstack/FullStack';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/web-development");
  return {
    title: dynamicSeo.title || "Custom Web Development Services | Next.js, React, Laravel | Webstep Solutions",
    description: dynamicSeo.description || "Custom websites and web apps built on Next.js, React and Laravel. Fast, SEO-ready code from a dedicated team. Tell us about your project.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/web-development/",
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <>
      <FullStack isFullstack={false} />
    </>
  );
}
