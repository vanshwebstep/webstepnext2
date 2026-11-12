import React from 'react';
import Home from '@/components/HomePage/Home';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("/");
  return {
    title: dynamicSeo.title || "Web Development Company for Agencies & Growing Businesses | Webstep Solutions",
    description: dynamicSeo.description || "Webstep Solutions delivers custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Dedicated developers available.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepsolutions.com/",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return (
    <>
      <Home />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Webstep Solutions",
          "url": "https://webstepsolutions.com/",
          "logo": "https://webstepsolutions.com/webstepassets/img/logo.png",
          "image": "https://webstepsolutions.com/webstepassets/img/development-company.png",
          "description": "Custom WordPress, Shopify, React and Laravel development for agencies and growing businesses. Dedicated developers available.",
          "telephone": "+917973938927",
          "email": "info@webstepsolutions.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "E-45 Industrial Area Phase-8",
            "addressLocality": "Mohali",
            "addressRegion": "Punjab",
            "postalCode": "160071",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "30.7046",
            "longitude": "76.7179"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "sameAs": [
            "https://www.linkedin.com/company/webstep-solutions/"
          ],
          "priceRange": "$$"
        }) }}
      />
    </>
  );
}
