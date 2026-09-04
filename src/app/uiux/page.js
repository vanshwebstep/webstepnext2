import Ui from '@/components/uiux/Ui';
import React from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('uiux');
  return {
    title: dynamicSeo.title || "UI/UX Design | Webstep Solutions",
    description: dynamicSeo.description || "Bespoke UI/UX Design Services by Webstep Solutions.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function UiuxPage() {
  return <Ui />;
}
