import ServicesPage from '@/components/ServicesPage';
import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('services');
  return {
    title: dynamicSeo.title || "Our Services | Webstep Solutions",
    description: dynamicSeo.description || "Explore Webstep Solutions",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function Services() {
  return <ServicesPage />;
}
