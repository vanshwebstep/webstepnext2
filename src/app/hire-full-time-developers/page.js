import DynamicServiceLanding from "@/components/DynamicServiceLanding";
import { hireDevelopersPage } from "@/lib/servicePageFallbacks";
import { fetchSeoMetadata } from '@/lib/contentApi';


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('hire-full-time-developers');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function HireFullTimeDevelopersPage() {
  return <DynamicServiceLanding slug="hire-full-time-developers" fallback={hireDevelopersPage} />;
}
