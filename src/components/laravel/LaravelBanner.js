import React from 'react';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import { assetImage } from "@/lib/assets";
const laravel = assetImage("laravel.png");

const LaravelBanner = () => {
  return (
    <section className="py-16 md:py-24 pt-40 bg-white relative z-10 px-6 overflow-hidden font-roboto">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto relative z-10">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left Content */}
            <div className="lg:w-3/5">
              <div className="mb-10 text-center lg:text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-red-600 font-bold text-[10px] tracking-widest capitalize mb-6 shadow-sm">
                  Elegant PHP Framework
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900 mb-8 tracking-tight capitalize">
                  Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Laravel Development</span> Services
                </h1>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                  Build elegant and expressive web applications with our Laravel experts. We specialize in creating secure, scalable, and maintainable PHP solutions for modern businesses.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black capitalize tracking-[0.2em] shadow-lg shadow-slate-900/20 hover:bg-red-600 hover:-translate-y-1 transition-all duration-300">
                    Get A Free Quote
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:w-2/5 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                  <Image src={laravel} alt="Laravel Development" className="w-full h-auto max-w-[300px]" />
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LaravelBanner;



