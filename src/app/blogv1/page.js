import Blogv1 from '@/components/Blogv1';
import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('blogv1');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function Blogv1Page() {
  return <Blogv1 />;
}
