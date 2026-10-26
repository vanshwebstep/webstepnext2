import React from 'react';
import Laravel from '@/components/laravel/Laravel';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("laravel");
  return {
    title: dynamicSeo.title || "Laravel Development Company | Custom PHP Web Applications | Webstep Solutions",
    description: dynamicSeo.description || "Secure, scalable Laravel web applications and REST APIs built with clean MVC architecture, database optimization, and enterprise-grade security.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/services/laravel/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Laravel />
    </>
  );
}
