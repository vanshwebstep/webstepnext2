"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import { FaCalendarAlt, FaUser, FaEye, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { fetchBlogs } from '@/lib/contentApi';
import { assetImage, resolveBlogImage } from "@/lib/assets";
const blog1 = assetImage("blog1.png");
const blog2 = assetImage("blog2.png");
const blog3 = assetImage("blog3.png");

const BlogPosts = () => {
  const router = useRouter();
  const [blogPostsData, setBlogPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs({ categories: [], blogs: [] })
      .then((data) => {
        if (data.blogs) {
          setBlogPostsData(data.blogs);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="postblogs" className="py-12 sm:py-24 relative z-10 px-4 sm:px-6 font-roboto overflow-hidden" style={{
      background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f7fffe 100%)",
    }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto">
        <AnimatedSection delay={0} direction="up" className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5 shadow-sm">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]" />
            </span>
            Latest Insights
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 capitalize tracking-tight">
            Our{" "}
            <span style={{
              background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Latest Blogs
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-xl max-w-2xl mx-auto">
            Expert insights on React, Next.js, Shopify, WordPress, Laravel, AI integrations,
            and everything in between — from the Webstep Solutions team.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-10">
          {blogPostsData.map((post, index) => (
            <AnimatedSection key={post.id} delay={0.1 * index} direction="up" className="h-full">
              <div className="group relative flex flex-col rounded-3xl sm:rounded-[2.5rem] overflow-hidden 
                bg-white/70 backdrop-blur-xl border border-white/40 
                shadow-[0_20px_80px_rgba(0,0,0,0.08)] 
                hover:shadow-[0_30px_100px_rgba(236,72,153,0.15)] 
                transition-all duration-500 h-full hover:-translate-y-3">

                {/* Gradient Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.15), transparent 60%)" }}
                />

                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 sm:h-64 overflow-hidden cursor-pointer">
                    <Image
                      src={resolveBlogImage(post.image || post.imageSrc)}
                      alt={post.title}
                      fill
                      unoptimized={true}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5">
                      <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold text-pink-600 tracking-wider shadow">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 sm:p-8 flex flex-col flex-grow">

                  {/* Meta */}
                  <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-5 text-[11px] sm:text-xs font-semibold text-slate-400 tracking-wide">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <FaCalendarAlt className="text-pink-500 text-xs sm:text-sm" />
                      <span>{post.published_date || post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <FaEye className="text-orange-500 text-xs sm:text-sm" />
                      <span>{post.views || 0} Views</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-2 sm:mb-4 leading-snug group-hover:text-pink-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow line-clamp-3">
                    {post.excerpt || post.description}
                  </p>

                  {/* Footer */}
                  <div className="pt-4 sm:pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center shadow-sm">
                        <FaUser className="text-sm sm:text-lg text-pink-500" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide">
                        {post.author}
                      </span>
                    </div>
                    <button
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="flex items-center gap-1.5 sm:gap-2 text-pink-600 text-xs sm:text-sm font-extrabold tracking-wider group/link"
                    >
                      Read More
                      <FaArrowRight className="group-hover/link:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;