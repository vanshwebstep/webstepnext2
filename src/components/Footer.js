"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FaFacebookF, FaInstagram, FaLinkedinIn,
    FaTwitter, FaYoutube, FaPhoneAlt, FaPaperPlane, FaChevronUp,
} from 'react-icons/fa';
import { assetImage } from "@/lib/assets";
import { submitNewsletter } from "@/lib/contentApi";
import { THANK_YOU_ROUTE } from "@/lib/routes";
const logo = assetImage("logo.png");

const socialLinks = [
    // { icon: <FaFacebookF size={15} />, href: "https://facebook.com/webstepsolutions", label: "Facebook",  hoverColor: "#1877f2" },
    // { icon: <FaInstagram size={15} />, href: "https://instagram.com/webstepsolutions", label: "Instagram", hoverColor: "#e1306c" },
    { icon: <FaLinkedinIn size={15} />, href: "https://www.linkedin.com/company/webstep-solutions/", label: "LinkedIn", hoverColor: "#0077b5" },
    { icon: <FaTwitter size={15} />,   href: "#", label: "Twitter",   hoverColor: "#1da1f2" },
    // { icon: <FaYoutube size={15} />,   href: "https://youtube.com/@webstepsolutions", label: "YouTube",   hoverColor: "#ff0000" },
];

const quickLinks = [
    { name: "Home",      href: "/" },
    { name: "Services",  href: "/services" },
    { name: "Our Work",  href: "/works" },
    { name: "About Us",  href: "/about" },
    { name: "Blog",      href: "/blog" },
    { name: "Contact",   href: "/contactus" },
];

const services = [
    { name: "React & Next.js",     href: "/services/reactjs" },
    { name: "WordPress & Plugins", href: "/services/wordpress" },
    { name: "Shopify Themes & Apps", href: "/services/shopify" },
    { name: "Laravel & PHP",       href: "/services/laravel" },
    { name: "Industrial Training", href: "/industrial-training" },
    { name: "Hire Developers",     href: "/hire-full-time-developers" },
    { name: "AI Chatbots",         href: "/services/ai" },
];

const ColTitle = ({ children }) => (
    <h4 className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-5 h-0.5 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #E879F9, #38BDF8)" }} />
        {children}
    </h4>
);

const NavLink = ({ href, children }) => (
    <li>
        <Link href={href}
            className="group inline-flex items-center gap-0 text-[11px] font-semibold uppercase tracking-widest text-slate-500 hover:text-[#FF1F8E] transition-colors duration-200">
            {children}
            <span className="ml-0 opacity-0 group-hover:opacity-100 group-hover:ml-1.5 transition-all duration-200 text-[10px]">→</span>
        </Link>
    </li>
);

const Footer = () => {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [subscribeError, setSubscribeError] = useState('');

    const handleSubscribe = async () => {
        const trimmedEmail = email.trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setSubscribeError('Please enter a valid email address.');
            return;
        }

        setSubmitting(true);
        setSubscribeError('');

        try {
            await submitNewsletter({ email: trimmedEmail, source: 'footer' });
            setSubmitted(true);
            setEmail('');
            router.push(THANK_YOU_ROUTE);
        } catch (error) {
            setSubscribeError(error.message || 'Subscription failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <footer
            className="relative overflow-hidden pt-24 pb-12 border-t"
            style={{
                background: "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 50%, #f4f6fb 100%)",
                borderColor: "#e2e8f0",
            }}
        >
            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(232,121,249,0.07) 0%, transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)" }} />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

            <div className="container mx-auto px-6 relative z-10">

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex w-fit items-center">
                            <Image src={logo} alt="Webstep Solutions Logo" width={170} />
                        </Link>

                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Webstep Solutions builds websites, apps, and AI-powered digital products — for startups, small businesses, and enterprises across the globe.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((s, i) => (
                                <a key={i} href={s.href} aria-label={s.label}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:scale-110"
                                    style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                                    onMouseEnter={e => { e.currentTarget.style.color = s.hoverColor; e.currentTarget.style.borderColor = s.hoverColor + "60"; e.currentTarget.style.background = s.hoverColor + "15"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-3 p-4 rounded-2xl transition-all duration-300"
                            style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(56,189,248,0.15))", border: "1px solid rgba(232,121,249,0.2)" }}>
                                <FaPhoneAlt size={14} color="#E879F9" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black mb-0.5">Talk to us</p>
                                <a href="tel:7973938927" className="text-slate-900 font-black text-sm hover:text-[#E879F9] transition-colors">
                                    +91 79739-38927
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <ColTitle>Navigation</ColTitle>
                        <ul className="space-y-3.5">
                            {quickLinks.map((l, i) => <NavLink key={i} href={l.href}>{l.name}</NavLink>)}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <ColTitle>Our Services</ColTitle>
                        <ul className="space-y-3.5">
                            {services.map((s, i) => <NavLink key={i} href={s.href}>{s.name}</NavLink>)}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-5">
                        <ColTitle>Stay Updated</ColTitle>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            Get the latest on web tech, development tips, and Webstep updates — no spam, ever.
                        </p>

                        {/* Email input */}
                        {submitted ? (
                            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                                style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>
                                <span className="text-emerald-400 text-lg">✓</span>
                                <p className="text-emerald-400 text-sm font-semibold">You're subscribed!</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="relative"
                                    style={{
                                        background: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "16px",
                                        padding: "4px",
                                    }}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => {
                                            setEmail(e.target.value);
                                            setSubscribeError('');
                                        }}
                                        onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                        placeholder="your@email.com"
                                        disabled={submitting}
                                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm px-4 py-3 pr-32 focus:outline-none disabled:opacity-60"
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        aria-label="Subscribe"
                                        disabled={submitting}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgba(232,121,249,0.3)]"
                                        style={{ background: "linear-gradient(135deg, #E879F9, #A855F7)" }}
                                    >
                                        <FaPaperPlane size={10} />
                                        {submitting ? 'Sending' : 'Subscribe'}
                                    </button>
                                </div>
                                {subscribeError && (
                                    <p className="text-rose-500 text-[10px] px-1 font-semibold">{subscribeError}</p>
                                )}
                                <p className="text-slate-600 text-[10px] px-1">No spam. Unsubscribe anytime.</p>
                            </div>
                        )}

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["React", "Next.js", "WordPress", "Shopify", "AI", "Laravel"].map(tag => (
                                <span key={tag}
                                    className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                    style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#94a3b8" }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Divider with gradient ── */}
                <div className="h-px mb-8 rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(232,121,249,0.5), rgba(56,189,248,0.5), transparent)" }} />

                {/* ── Bottom bar ── */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                        © {currentYear}{" "}
                        <span
                            style={{ background: "linear-gradient(135deg, #E879F9, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                        >
                            Webstep Solutions
                        </span>
                        . All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="flex items-center gap-1.5 group hover:text-[#E879F9] transition-colors"
                        >
                            Back to top
                            <FaChevronUp size={11} className="group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
