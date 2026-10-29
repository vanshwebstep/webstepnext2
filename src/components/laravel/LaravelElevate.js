import React from 'react';
import Image from 'next/image';
import AnimatedSection from '../AnimatedSection';
import { FaLayerGroup, FaShieldAlt, FaLightbulb } from 'react-icons/fa';
import { assetImage } from "@/lib/assets";
const laravel = assetImage("laravel.png");

const LaravelElevate = () => {
  return (
    <section className="py-16 md:py-24 pt-40 bg-white relative z-10 px-6 overflow-hidden font-roboto">

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ef4444 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="bg-red-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative bg-white p-6 rounded-3xl shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                  <Image src={laravel} alt="Professional Laravel Developers" className="w-full h-auto max-w-[200px]" />
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <AnimatedSection delay={0.1} direction="right">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 capitalize tracking-tight leading-tight">
                    Hire Skilled <span className="text-red-600">Laravel Developers</span>
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    Our Laravel developers are experts in building clean, elegant, and maintainable applications. We follow PSR standards and leverage Laravel&apos;s full power to deliver exceptional results.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { icon: <FaLayerGroup className="text-red-500" />, label: "Eloquent ORM" },
                    { icon: <FaShieldAlt className="text-orange-500" />, label: "Secure Auth" },
                    { icon: <FaLightbulb className="text-red-500" />, label: "Clean Code" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm">
                      <div className="text-xl">{item.icon}</div>
                      <span className="font-bold text-slate-800 text-xs capitalize tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-12 px-10 py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black capitalize tracking-[0.25em] shadow-2xl hover:bg-red-600 transition-all duration-300">
                  Get Started Today
                </button>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaravelElevate;



