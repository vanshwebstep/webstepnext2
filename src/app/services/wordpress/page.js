import React from 'react';
import Wp from '@/components/Wp/Wp';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/wordpress");
  return {
    title: dynamicSeo.title || "WordPress Development Services | Custom Themes & Plugins",
    description: dynamicSeo.description || "Hand-coded WordPress themes, custom plugins and headless builds from your Figma designs. No page-builder bloat. Request a WordPress quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Wp />;
}
