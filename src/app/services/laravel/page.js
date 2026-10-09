import React from 'react';
import Laravel from '@/components/laravel/Laravel';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/laravel");
  return {
    title: dynamicSeo.title || "Laravel Development Company | Custom PHP Web Apps",
    description: dynamicSeo.description || "Secure Laravel applications, REST APIs and custom PHP development, from MVPs to systems built to scale. Talk to a Laravel developer.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Laravel />;
}
