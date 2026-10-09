import React from 'react';
import Contact from '@/components/contactus/Contact';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("contactus");
  return {
    title: dynamicSeo.title || "Contact Webstep | Request a Web Development Quote",
    description: dynamicSeo.description || "Tell us about your project or the developers you need. Share your requirements and we will reply within one business day.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <Contact />;
}
