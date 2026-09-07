"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitNewsletter } from '@/lib/contentApi';

import {
    FaCalendarAlt,
    FaUser,
    FaEye,
    FaArrowRight,
    FaArrowLeft,
    FaTwitter,
    FaLinkedinIn,
    FaFacebookF,
    FaLink,
    FaTag,
    FaClock,
    FaHeart,
    FaRegHeart,
    FaChevronRight,
} from "react-icons/fa";
import { assetImage, resolveBlogImage } from "@/lib/assets";
const blog1 = assetImage("blog1.png");
const blog2 = assetImage("blog2.png");
const blog3 = assetImage("blog3.png");
const blog4 = assetImage("blog4.png");

/* ─── HELPERS ─── */
const GradientText = ({ children, className = "" }) => (
    <span
        className={className}
        style={{
            background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        }}
    >
        {children}
    </span>
);

const PingDot = () => (
    <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF1F8E]" />
    </span>
);

/* ─── CONTENT BLOCKS ─── */
const ContentBlock = ({ block }) => {
    switch (block.type) {
        case "lead":
            return (
                <p className="text-xl md:text-2xl font-semibold text-slate-700 leading-relaxed border-l-4 border-pink-400 pl-6 py-2 mb-8">
                    {block.text}
                </p>
            );
        case "h2":
            return (
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-12 mb-5 tracking-tight">
                    {block.text}
                </h2>
            );
        case "p":
            return (
                <p className="text-slate-600 text-lg leading-relaxed mb-6">{block.text}</p>
            );
        case "list":
            return (
                <ul className="space-y-3 mb-8">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-base">
                            <FaChevronRight className="text-pink-500 mt-1 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "quote":
            return (
                <blockquote
                    className="relative my-10 px-10 py-8 rounded-3xl overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #eff6ff 100%)" }}
                >
                    <div className="absolute top-4 left-6 text-7xl font-serif text-pink-200 leading-none select-none">"</div>
                    <p className="relative z-10 text-xl md:text-2xl font-semibold text-slate-700 italic leading-snug mb-3">
                        {block.text}
                    </p>
                    <p className="text-sm font-bold text-pink-500 tracking-widest uppercase">— {block.author}</p>
                </blockquote>
            );
        default:
            return null;
    }
};

/* ─── SHARE BUTTON ─── */
/* ─── SHARE BUTTON ─── */
const ShareBtn = ({ icon: Icon, label, color, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
        style={{ background: color }}
    >
        <Icon />
        {label}
    </a>
);
/* ─── RELATED CARD ─── */
const RelatedCard = ({ post, router }) => {
    const imgSrc = resolveBlogImage(post.image || post.imageSrc);
    return (
        <div className="group flex flex-col rounded-[2rem] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)] hover:shadow-[0_30px_80px_rgba(236,72,153,0.13)] transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-44 overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-cyan-200">
                <Image
                    src={imgSrc}
                    alt={post.title}
                    fill
                    unoptimized={true}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 px-3 py-1 bg-white/90 rounded-full text-[10px] font-bold text-pink-600 tracking-wider">
                    {post.category}
                </span>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold mb-3">
                    <span className="flex items-center gap-1"><FaCalendarAlt className="text-pink-400" />{post.published_date || post.date}</span>
                    {post.views && <span className="flex items-center gap-1"><FaEye className="text-orange-400" />{post.views}</span>}
                </div>
            <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-4 flex-grow group-hover:text-pink-600 transition-colors">
                {post.title}
            </h4>
            <button
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="flex items-center gap-2 text-pink-600 text-sm font-extrabold tracking-wide group/link"
            >
                Read More <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
  );
};

/* ─── PROGRESS BAR ─── */
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const scrolled = el.scrollTop;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
            <div
                className="h-full transition-all duration-100"
                style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #E879F9, #A855F7, #38BDF8)",
                }}
            />
        </div>
    );
};

/* ─── MAIN PAGE ─── */
const SingleBlogPage = ({ post, relatedPosts = [] }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likes || 0);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [subStatus, setSubStatus] = useState("idle");

    // current blog ka actual URL — sirf client pr available hota hai
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    const shareText = encodeURIComponent(post?.title || "");
    const encodedUrl = encodeURIComponent(shareUrl || (typeof window !== "undefined" ? window.location.href : ""));

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setSubStatus("loading");
        try {
            await submitNewsletter({ email });
            setSubStatus("success");
            setEmail("");
            setTimeout(() => setSubStatus("idle"), 3000);
        } catch (err) {
            setSubStatus("error");
            setTimeout(() => setSubStatus("idle"), 3000);
        }
    };

    const handleLike = () => {
        setLiked((p) => !p);
        setLikeCount((c) => (liked ? c - 1 : c + 1));
    };

    const handleCopy = () => {
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <ReadingProgress />

            <div
                className="min-h-screen font-roboto"
                style={{
                    background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f7fffe 100%)",
                }}
            >
                {/* ── HERO ── */}
                <section className="relative pt-20 pb-0 px-6 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-100 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                    <div className="container mx-auto w-[80%] mt-20 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-slate-400 font-semibold mb-8">
                            <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
                            <FaChevronRight className="text-xs" />
                            <Link href="/blog" className="hover:text-pink-500 transition-colors">Blog</Link>
                            <FaChevronRight className="text-xs" />
                            <span className="text-slate-600 truncate max-w-xs">{post.title}</span>
                        </nav>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[10px] tracking-[0.3em] uppercase mb-6 shadow-sm">
                            <PingDot />
                            {post.category}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                            {post.title.split(" ").slice(0, 4).join(" ")}{" "}
                            <GradientText>
                                {post.title.split(" ").slice(4).join(" ")}
                            </GradientText>
                        </h1>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500 mb-10">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
                                    <FaUser className="text-pink-500 text-sm" />
                                </div>
                                <span className="text-slate-800">{post.author}</span>
                            </div>
                            <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-pink-400" />{post.published_date || post.date}</span>
                            <span className="flex items-center gap-1.5"><FaClock className="text-purple-400" />{post.read_time || post.readTime || '5 min read'}</span>
                            <span className="flex items-center gap-1.5"><FaEye className="text-orange-400" />{(post.views || 0).toLocaleString()} Views</span>
                            <button
                                onClick={handleLike}
                                className="flex items-center gap-1.5 transition-all duration-300 hover:scale-110"
                            >
                                {liked
                                    ? <FaHeart className="text-pink-500 text-base" />
                                    : <FaRegHeart className="text-pink-400 text-base" />}
                                <span className={liked ? "text-pink-500" : ""}>{likeCount}</span>
                            </button>
                        </div>
                    </div>

                    {/* ── HERO IMAGE ──
                        KEY FIX: No fill prop. Use width/height from the imported
                        image object (Next.js static imports expose .width/.height).
                        Parent div clips to desired height via overflow-hidden.
                        Position relative + inset-0 overlay sits cleanly on top.
                    ── */}
                    <div className="container mx-auto w-[80%]">
                        <div
                            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.15)]"
                            style={{ height: 'clamp(288px, 40vw, 480px)' }}
                        >
                            {/* Fallback shown if imageSrc is missing */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, #f9a8d4 0%, #c084fc 40%, #67e8f9 100%)",
                                }}
                            />

                            {(post.image || post.imageSrc) && (
                                <Image
                                    src={resolveBlogImage(post.image || post.imageSrc)}
                                    alt={post.title}
                                    fill
                                    priority
                                    unoptimized={true}
                                    className="object-cover"
                                />
                            )}

                            {/* Dark overlay on top */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                                    zIndex: 1,
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* ── BODY ── */}
                <section className="py-20 px-6">
                    <div className="container mx-auto w-[70%]">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">

                            {/* ── ARTICLE ── */}
                            <article className="lg:w-2/3 w-full">
                                {Array.isArray(post.content) ? (
                                    post.content.map((block, i) => (
                                        <ContentBlock key={i} block={block} />
                                    ))
                                ) : (
                                    <div
                                        className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed space-y-6"
                                        dangerouslySetInnerHTML={{ __html: post.content || "" }}
                                    />
                                )}

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-12 flex flex-wrap items-center gap-3">
                                        <FaTag className="text-pink-400 text-sm" />
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:border-pink-400 hover:text-pink-600 transition-colors cursor-pointer shadow-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Share */}
                              <div className="mt-12 p-8 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
    <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-5">Share this article</p>
    <div className="flex flex-wrap gap-3">
        <ShareBtn
            icon={FaTwitter}
            label="Twitter"
            color="#1DA1F2"
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}
        />
        <ShareBtn
            icon={FaLinkedinIn}
            label="LinkedIn"
            color="#0077B5"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        />
        <ShareBtn
            icon={FaFacebookF}
            label="Facebook"
            color="#1877F2"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        />
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm border border-slate-200 text-slate-600 bg-white hover:border-pink-400 hover:text-pink-600 transition-all duration-300 hover:scale-105 shadow-sm"
        >
            <FaLink />
            {copied ? "Copied!" : "Copy Link"}
        </button>
    </div>
</div>

                                {/* Author card */}
                                <div className="mt-10 p-8 rounded-[2rem] overflow-hidden relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-pink-100 rounded-full blur-[60px] pointer-events-none" />
                                    <div className="flex items-start gap-6 relative z-10">
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <FaUser className="text-white text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-pink-500 tracking-widest uppercase mb-1">Written by</p>
                                            <h4 className="text-xl font-black text-slate-900 mb-2">{post.author}</h4>
                                          <p className="text-slate-500 text-sm leading-relaxed">
  Senior content strategist at Webstep Solutions with 10+ years of experience 
  in web development, eCommerce, and digital marketing. Passionate about turning 
  complex tech topics into clear, actionable insights.
</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Back */}
                                <div className="mt-10">
                                    <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-pink-600 transition-colors group">
                                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                        Back to Blog
                                    </button>
                                </div>
                            </article>

                            {/* ── SIDEBAR ── */}
                            <aside className="lg:w-1/3 w-full lg:sticky lg:top-24 space-y-8">

                                {/* Table of Contents */}
                                <div className="p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-white/60 text-[#FF1F8E] font-bold text-[10px] tracking-[0.25em] uppercase mb-5 shadow-sm">
                                        <PingDot />
                                        Contents
                                    </div>
                                    <ul className="space-y-3">
                                        {Array.isArray(post?.content) && post.content
                                            .filter((b) => b.type === "h2")
                                            .map((b, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={`#section-${i}`}
                                                        className="flex items-start gap-3 text-sm text-slate-600 font-semibold hover:text-pink-600 transition-colors group"
                                                    >
                                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-[10px] font-black text-pink-500 mt-0.5">
                                                            {i + 1}
                                                        </span>
                                                        <span className="group-hover:translate-x-0.5 transition-transform">{b.text}</span>
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div
                                    className="relative p-[2px] rounded-[2rem] shadow-[0_20px_60px_rgba(236,72,153,0.2)]"
                                    style={{ background: "linear-gradient(135deg, #E879F9, #A855F7, #38BDF8)" }}
                                >
                                    <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl p-7">
                                        <h3 className="text-xl font-black text-slate-900 mb-2">
                                            Stay <GradientText>Updated</GradientText>
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-5">Get the latest insights straight to your inbox.</p>
                                        <form onSubmit={handleSubscribe}>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Your email address"
                                                className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 transition-all duration-300 shadow-sm text-sm mb-3"
                                            />
                                            <button
                                                type="submit"
                                                disabled={subStatus === 'loading'}
                                                className="w-full py-3 rounded-2xl text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-300 hover:shadow-pink-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                                                style={{ background: "linear-gradient(135deg, #FF1F8E, #A855F7)" }}
                                            >
                                                {subStatus === 'loading' ? 'Subscribing...' : subStatus === 'success' ? 'Subscribed! ✓' : subStatus === 'error' ? 'Error!' : 'Subscribe Now →'}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Popular Tags */}
                                <div className="p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
                                    <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-5">Popular Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                       {["React.js", "Next.js", "Shopify", "WordPress", "Laravel", "AI Chatbots", "SEO", "Node.js"].map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:border-pink-400 hover:text-pink-600 transition-all cursor-pointer shadow-sm hover:scale-105"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </aside>
                        </div>
                    </div>
                </section>

                {/* ── RELATED POSTS ── */}
                <section
                    className="py-20 px-6 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, #f0fdf9 0%, #ecfdf5 30%, #f0fdfa 60%, #f7fffe 100%)",
                    }}
                >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    <div className="container mx-auto w-[70%]">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-[#FF1F8E] font-bold text-[10px] tracking-[0.3em] uppercase mb-5 shadow-sm">
                                <PingDot />
                                Keep Reading
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                                Related <GradientText>Articles</GradientText>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {relatedPosts.map((p) => (
                                <RelatedCard key={p.id} post={p} router={router} />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SingleBlogPage;



