 import PrivacyPolicy from '@/components/PrivacyPolicy';

import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('privacy');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function PrivacyPolic() {
  return <PrivacyPolicy />;
}
