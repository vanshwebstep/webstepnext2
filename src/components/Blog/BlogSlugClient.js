"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SingleBlogPage from '@/components/Blog/SingleBlogPost';
import { fetchBlogBySlug } from '@/lib/contentApi';

export default function BlogSlugClient({ post: initialPost, related: initialRelated, slug: propSlug }) {
  const params = useParams();
  const slug = propSlug || params?.slug;

  const [blogData, setBlogData] = useState(initialPost || null);
  const [relatedData, setRelatedData] = useState(initialRelated || []);
  const [loading, setLoading] = useState(!initialPost && !!slug);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchBlogBySlug(slug)
      .then((res) => {
        if (res && res.blog) {
          setBlogData(res.blog);
          setRelatedData(res.related || []);
          setError(false);
        } else if (!initialPost) {
          setError(true);
        }
      })
      .catch(() => {
        if (!initialPost) setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, initialPost]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-32 font-roboto">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-semibold text-sm">Loading article from API...</p>
        </div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-32 font-roboto">
        <div className="text-center px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Blog Post Not Found</h2>
          <p className="text-slate-500 mb-6">Could not fetch article for &ldquo;{slug}&rdquo; from /api/blogs.php</p>
          <Link href="/blog" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold hover:shadow-lg transition">
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return <SingleBlogPage post={blogData} relatedPosts={relatedData} />;
}