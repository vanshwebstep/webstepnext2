import React from 'react';
import FullStack from '@/components/Fullstack/FullStack';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("web-development");
  return {
    title: dynamicSeo.title || "Custom Web Development Services | Next.js, React & Laravel | Webstep Solutions",
    description: dynamicSeo.description || "High-performance custom web applications built on Next.js, React, and modern full-stack architectures. Fast, accessible, and engineered for conversion.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/web-development/",
    }
  };
}

export default function Page() {
  return (
    <>
      <FullStack />
    </>
  );
}
