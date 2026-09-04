import B2BSalesPage from "@/components/B2BSalesPage";
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('b2b-sales');
  return {
    title: dynamicSeo.title || "Dedicated Developers for Agencies | Webstep Solutions",
    description: dynamicSeo.description || "Hire dedicated, pre-vetted developers for agency and SaaS teams with fast onboarding and monthly flexibility.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function Page() {
  return <B2BSalesPage />;
}
