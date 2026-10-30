import React from 'react';
import CustomizePackage from '@/components/CustomizePackage';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("customize-package");
  return {
    title: dynamicSeo.title || "Customize Your Web Development Package | Webstep Solutions",
    description: dynamicSeo.description || "Build a custom web development package tailored to your exact project scope, technology requirements, and timeline. Instant quote estimate.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/customize-package/",
    }
  };
}

export default function Page() {
  return (
    <>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading package customizer...</div>}>
      <CustomizePackage />
    </React.Suspense>
    </>
  );
}
