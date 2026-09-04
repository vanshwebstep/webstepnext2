import CustomizePackage from '@/components/CustomizePackage';
import React, { Suspense } from 'react';
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('customize-package');
  return {
    title: dynamicSeo.title || "Customize Your Package | Webstep Solutions",
    description: dynamicSeo.description || "Get an instant estimated price by selecting the features you need for your upcoming project.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function CustomizePackagePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense fallback={null}>
        <CustomizePackage />
      </Suspense>
    </main>
  );
}
