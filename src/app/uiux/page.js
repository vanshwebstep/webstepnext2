import React from 'react';
import Ui from '@/components/uiux/Ui';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("uiux");
  return {
    title: dynamicSeo.title || "UI/UX Design Services | Web & App Design | Webstep Solutions",
    description: dynamicSeo.description || "User-first interface design for websites and apps, from wireframes to approved Figma designs, ready for development. Request a design quote.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/ui-ux/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Ui />
    </>
  );
}
