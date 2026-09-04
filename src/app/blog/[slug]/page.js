import BlogSlugClient from '@/components/Blog/BlogSlugClient';
import { fetchBlogs, fetchBlogBySlug } from '@/lib/contentApi';
import { fetchSeoMetadata } from '@/lib/contentApi';

export async function generateStaticParams() {
  const data = await fetchBlogs({ categories: [], blogs: [] });
  const blogs = data?.blogs || [];
  return blogs.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = true;


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
