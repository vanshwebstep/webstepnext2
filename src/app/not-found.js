"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BASE_PATH = "/demo/webstepnext";

const SMART_REDIRECTS = [
  { match: ["laravel"], target: "/demo/webstepnext/services/laravel/" },
  { match: ["wordpress", "wp-", "wp"], target: "/demo/webstepnext/services/wordpress/" },
  { match: ["shopify"], target: "/demo/webstepnext/services/shopify/" },
  { match: ["woocommerce", "woo"], target: "/demo/webstepnext/services/woocommerce/" },
  { match: ["react", "nextjs", "next"], target: "/demo/webstepnext/services/reactjs/" },
  { match: ["php"], target: "/demo/webstepnext/services/php-development/" },
  { match: ["hire", "developer"], target: "/demo/webstepnext/hire-dedicated-developers/" },
  { match: ["contact"], target: "/demo/webstepnext/contactus/" },
  { match: ["about"], target: "/demo/webstepnext/about/" },
  { match: ["privacy"], target: "/demo/webstepnext/privacy-policy/" },
  { match: ["terms"], target: "/demo/webstepnext/terms-and-conditions/" },
  { match: ["fullstack", "full-stack"], target: "/demo/webstepnext/fullstack/" },
  { match: ["brand", "design"], target: "/demo/webstepnext/services/brand-design/" },
  { match: ["maintenance"], target: "/demo/webstepnext/services/website-maintenance/" },
  { match: ["ai-chatbot", "chatbot"], target: "/demo/webstepnext/services/ai-chatbots/" },
  { match: ["ai-automation", "automation"], target: "/demo/webstepnext/services/ai-automation/" },
  { match: ["ai-website", "ai-powered"], target: "/demo/webstepnext/services/ai-powered-websites/" },
];

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname.toLowerCase();
    const search = window.location.search || "";

    // 1. If user landed on root domain without /demo/webstepnext (e.g. http://localhost:3000/services/laravel/)
    if (!window.location.pathname.startsWith(BASE_PATH)) {
      setRedirecting(true);
      window.location.replace(`${BASE_PATH}${window.location.pathname}${search}`);
      return;
    }

    // 2. If user is in /demo/webstepnext/ but reached an unknown route, match smart keyword redirects
    for (const rule of SMART_REDIRECTS) {
      if (rule.match.some((keyword) => pathname.includes(keyword))) {
        setRedirecting(true);
        window.location.replace(rule.target);
        return;
      }
    }
  }, []);

  if (redirecting) {
    return (
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-white text-slate-900 font-roboto px-6 py-20 text-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-700 font-medium text-lg">Redirecting you to the correct page...</p>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-white text-slate-900 font-roboto px-6 py-20">

      {/* Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-pink-500/5 to-orange-500/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-500/5 to-pink-500/5 blur-[100px] [animation-delay:2s] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <h1 className="font-heading text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 opacity-10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/40 backdrop-blur-md border border-white/50 px-8 py-4 rounded-3xl shadow-2xl"
            >
              <span className="font-heading text-2xl md:text-4xl font-black text-slate-900 capitalize tracking-tight">
                Lost in Space?
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-black text-slate-900 capitalize tracking-tighter">
            Oops! Page <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500">Not Found</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl mx-auto">
            The page you&apos;re looking for might have been moved, deleted, or never existed in the first place. Don&apos;t worry, let&apos;s get you back on track.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-6"
          >
            <Link href="/" className="group relative inline-flex items-center justify-center px-12 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black capitalize tracking-[0.3em] overflow-hidden shadow-2xl shadow-slate-900/20 hover:-translate-y-1 transition-all duration-500">
              <span className="relative z-10">Return to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>

    </section>
  );
}
