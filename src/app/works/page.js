import React from 'react';
import WorkPortfolio from '@/components/ourworks/WorkPortfolio';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("works");
  return {
    title: dynamicSeo.title || "Web Development Portfolio | Webstep Solutions",
    description: dynamicSeo.description || "Recent projects built with React, Next.js, Laravel and WordPress for healthcare, SaaS, infrastructure and non-profit clients. See the results.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/demo/webstepnext/works/",
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
      <WorkPortfolio />
    </>
  );
}
