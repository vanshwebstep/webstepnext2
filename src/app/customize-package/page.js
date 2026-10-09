import React, { Suspense } from 'react';
import CustomizePackage from '@/components/CustomizePackage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("customize-package");
  return {
    title: dynamicSeo.title || "Get a Free Quote | Customize Your Project | Webstep",
    description: dynamicSeo.description || "Tell us what you need built and get a clear quote. Choose your services and share your requirements in two minutes.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CustomizePackage />
    </Suspense>
  );
}
