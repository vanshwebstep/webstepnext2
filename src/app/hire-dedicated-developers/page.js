import React from 'react';
import DynamicServiceLanding from '@/components/DynamicServiceLanding';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata("hire-dedicated-developers");
  return {
    title: dynamicSeo.title || "Hire Dedicated Developers | Remote Teams | Webstep Solutions",
    description: dynamicSeo.description || "Hire dedicated full-time WordPress, Shopify, React, and Laravel developers monthly. Flexible engagement models, US/CA/AU time-zone overlap, NDA protected.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {}),
    alternates: {
      canonical: "https://webstepdev.com/hire-dedicated-developers/",
    }
  };
}

export default function Page() {
  return (
    <>
      <DynamicServiceLanding slug="hire-dedicated-developers" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How quickly can a developer start?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typically within 2 to 5 business days after requirements alignment and candidate selection."
              }
            },
            {
              "@type": "Question",
              "name": "What engagement models do you offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer Dedicated Full-Time (40 hrs/week), Part-Time (20 hrs/week), and custom Project-Based Pods with dedicated QA and PM."
              }
            },
            {
              "@type": "Question",
              "name": "How do you handle time-zone differences?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our developers provide 3-5 hours of daily overlap with US (EST/PST), UK (GMT), Canadian, and Australian business hours for standups and real-time collaboration."
              }
            },
            {
              "@type": "Question",
              "name": "Who owns the source code and IP?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You do. You retain 100% full intellectual property (IP) rights, source code ownership, and repository access from day one."
              }
            },
            {
              "@type": "Question",
              "name": "What if the developer isn't the right fit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer a zero-risk replacement guarantee. If a developer isn't the right fit within the first two weeks, we replace them at no extra charge or issue a full refund for that period."
              }
            },
            {
              "@type": "Question",
              "name": "Can I interview developers before hiring?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. You can review CVs/portfolios and conduct live technical interviews before confirming any developer."
              }
            },
            {
              "@type": "Question",
              "name": "How do we communicate daily?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Via your preferred channels: Slack, Microsoft Teams, Discord, Jira, Trello, Asana, or GitHub, with daily async standups and weekly sprint calls."
              }
            },
            {
              "@type": "Question",
              "name": "Do you sign an NDA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We sign strict Non-Disclosure Agreements (NDAs) and confidentiality agreements before sharing any project materials or starting work."
              }
            },
            {
              "@type": "Question",
              "name": "What happens if a developer is sick or unavailable?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide immediate backup coverage from our in-house engineering bench so your delivery schedule and sprint milestones remain unaffected."
              }
            }
          ]
        }) }}
      />
    </>
  );
}
