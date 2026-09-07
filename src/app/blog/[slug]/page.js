import BlogSlugClient from '@/components/Blog/BlogSlugClient';
import { fetchBlogs, fetchBlogBySlug } from '@/lib/contentApi';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateStaticParams() {
  const data = await fetchBlogs({ categories: [], blogs: [] });
  const blogs = data?.blogs || [];
  let params = blogs.map((b) => ({ slug: b.slug }));
  
  if (params.length === 0) {
    params = [
      { slug: "ai-chatbots-customer-support-2025" },
      { slug: "best-ecommerce-platform-seo" },
      { slug: "react-vs-nextjs-2025" },
      { slug: "shopify-vs-laravel-ecommerce" }
    ];
  }
  
  return params;
}

export const dynamicParams = false;


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dynamicSeo = await fetchSeoMetadata(`blog/${slug}`);
  return {
    title: dynamicSeo.title || "Webstep Solutions",
    description: dynamicSeo.description || "Enterprise Software Development at Scale",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default async function BlogSlugPage({ params }) {
  const { slug } = await params;
  const result = await fetchBlogBySlug(slug);
  const post = result?.blog || null;
  const related = result?.related || [];
  return <BlogSlugClient post={post} related={related} slug={slug} />;
}
