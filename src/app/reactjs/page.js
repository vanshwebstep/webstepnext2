import React from 'react';
import ServiceDetailPage from '@/components/Servicedetailpage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("reactjs");
  return {
    title: dynamicSeo.title || "React.js & Next.js Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Dynamic, blazing-fast web applications built with React.js and Next.js. Server-side rendering, optimized performance, and pixel-perfect UI execution.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/reactjs/",
    }
  };
}

export default function Page() {
  return (
    <>
      <ServiceDetailPage serviceSlug="reactjs" />
    </>
  );
}
