import React from 'react';
import FullStack from '@/components/Fullstack/FullStack';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("fullstack");
  return {
    title: dynamicSeo.title || "Full Stack Development Services | Node.js, React & APIs | Webstep Solutions",
    description: dynamicSeo.description || "Full stack developers for Next.js, React, Node.js and Laravel projects, custom API integrations and scalable architectures. Request a project quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepsolutions.com/fullstack/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return (
    <>
      <FullStack isFullstack={true} />
    </>
  );
}
