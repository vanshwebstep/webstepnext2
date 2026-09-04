import Home from '@/components/HomePage/Home'
import React from 'react'
import { fetchSeoMetadata } from '@/lib/contentApi';

function page() {
  return (
    <>
    <Home/>
    </>
  )
}


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('/');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default page