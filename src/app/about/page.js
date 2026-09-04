import React from 'react';
import AboutHero from '@/components/About/AboutHero';
import AboutStory from '@/components/About/AboutStory';
import AboutValues from '@/components/About/AboutValues';
import AboutStats from '@/components/About/AboutStats';
import BlogReview from '@/components/Blog/BlogReview';
import Customer from '@/components/Customer';
import FormSection from '@/components/FormSection';
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('about');
  return {
    title: dynamicSeo.title || "About Us | Webstep Solutions",
    description: dynamicSeo.description || "Learn more about Webstep Solutions, our mission, values, and the team behind our digital excellence.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <BlogReview />
      <Customer />
      <FormSection />
    </main>
  );
}
