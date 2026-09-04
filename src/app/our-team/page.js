import OurTeamPage from "@/components/team/OurTeamPage";
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('our-team');
  return {
    title: dynamicSeo.title || "Our Team | Webstep Solutions",
    description: dynamicSeo.description || "Meet the Webstep Solutions team covering strategy, UI/UX design, web development, mobile apps, QA, and digital growth.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function Page() {
  return <OurTeamPage />;
}
