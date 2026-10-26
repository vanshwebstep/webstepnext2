import React from 'react';
import Contact from '@/components/contactus/Contact';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("contactus");
  return {
    title: dynamicSeo.title || "Contact Webstep Solutions | Start Your Web Project Today",
    description: dynamicSeo.description || "Get in touch with Webstep Solutions for a detailed project consultation. We respond within one business day. Call +91 7973938927 or send your requirements.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/contact/",
    }
  };
}

export default function Page() {
  return (
    <>
      <Contact />
    </>
  );
}
