import DynamicServiceLanding from "@/components/DynamicServiceLanding";
import { industrialTrainingPage } from "@/lib/servicePageFallbacks";
import { fetchSeoMetadata } from '@/lib/contentApi';


export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('industrial-training');
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function IndustrialTrainingPage() {
  return <DynamicServiceLanding slug="industrial-training" fallback={industrialTrainingPage} />;
}
