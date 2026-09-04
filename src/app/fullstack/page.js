import FullStack from '@/components/Fullstack/FullStack';
import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('fullstack');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function FullstackPage() {
  return <FullStack />;
}
