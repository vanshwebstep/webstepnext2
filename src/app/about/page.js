import React from 'react';
import AboutHero from '@/components/About/AboutHero';
import AboutStory from '@/components/About/AboutStory';
import AboutValues from '@/components/About/AboutValues';
import BlogReview from '@/components/Blog/BlogReview';
import Customer from '@/components/Customer';
import FormSection from '@/components/FormSection';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("about");
  return {
    title: dynamicSeo.title || "About Webstep | Web Development Team Since 2012",
    description: dynamicSeo.description || "Mohali-based team with 12+ years building WordPress, Shopify and custom web apps for clients in 15+ countries. Meet the people behind Webstep.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}

export default function Page() {
  return <main className="bg-white min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      {/* <BlogReview /> */}
      <Customer />
      <FormSection />
    </main>;
}
