import React from 'react';
import Php from '@/components/php/Php';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("php");
  return {
    title: dynamicSeo.title || "Custom PHP Development Services | Webstep Solutions",
    description: dynamicSeo.description || "Custom PHP development, legacy code modernization, database optimization, and third-party API integrations by senior PHP engineers.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/php-development/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Php />
    </>
  );
}
