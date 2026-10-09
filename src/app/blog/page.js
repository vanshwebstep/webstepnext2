import React from 'react';
import Blog from '@/components/Blog/Blog';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("blog");
  return {
    title: dynamicSeo.title || "Web Development Blog | Webstep Solutions",
    description: dynamicSeo.description || "Practical guides on choosing platforms, hiring developers and building better websites, from the Webstep development team.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Blog />;
}
