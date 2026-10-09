import React from 'react';
import Php from '@/components/php/Php';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("services/php-development");
  return {
    title: dynamicSeo.title || "PHP Development Services | Custom PHP & Laravel Apps",
    description: dynamicSeo.description || "Custom PHP development, from web applications and APIs to upgrades of older systems. Talk to a PHP developer about your project.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Php />;
}
