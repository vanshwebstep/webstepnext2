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
    title: dynamicSeo.title || "About Webstep Solutions | Web Development Team & Culture",
    description: dynamicSeo.description || "Meet Webstep Solutions — a dedicated web development company founded in 2014. We help agencies and growing brands build better digital products.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/about/",
    }
  };
}

export default function Page() {
  return (
    <>
      <main className="bg-white min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      {/* <BlogReview /> */}
      <Customer />
      <FormSection />
    </main>
    </>
  );
}
