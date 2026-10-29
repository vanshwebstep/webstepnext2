import React from 'react';
import ExpertsForm from '../ExpertsForm';
import AnimatedSection from '../AnimatedSection';

const Software = () => {
  return (
    <section className="py-12 sm:py-24 bg-white relative z-10 px-4 sm:px-6 overflow-hidden font-roboto">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-50 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-60"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-16">
        <div className="w-full lg:w-3/5 relative">

  {/* Background Glow */}
  <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-500/20 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-violet-500/20 blur-[120px] rounded-full"></div>

  <AnimatedSection delay={0.1} direction="left">
    <div className="relative z-10">

      {/* Tag */}
      <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl 
        bg-white/60 backdrop-blur-xl border border-white/40 
        text-[#FF1F8E] font-semibold text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6 shadow-lg">

        <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-70"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#FF1F8E]"></span>
        </span>

        Scale Your Business
      </div>

      {/* Heading */}
      <h4 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight">
        Ready when{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-pink-400 via-violet-500 to-sky-400 bg-clip-text text-transparent">
            you are
          </span>

          {/* underline glow */}
          <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-gradient-to-r from-pink-400 to-violet-500 blur-md opacity-40 rounded-full"></span>
        </span>
      </h4>

      {/* Subheading */}
      <h5 className="text-base sm:text-xl md:text-2xl font-semibold text-slate-700 mb-4 sm:mb-6">
        Let’s build something powerful together
      </h5>

      {/* Description */}
      <p className="text-slate-500 text-xs sm:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xl">
        Share your idea and we’ll turn it into a high-performance digital product. 
        From startups to enterprises, we craft scalable, elegant, and future-ready solutions.
      </p>

      {/* CTA + Stats Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-10">

        {/* CTA Button */}
        <button className="relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white text-xs sm:text-sm font-semibold text-center
          bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 
          shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]">

          <span className="relative z-10">Start Your Project</span>

          {/* glow */}
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 blur-xl opacity-40"></span>
        </button>

        {/* Mini Trust Stats */}
        <div className="flex items-center justify-around sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">

          <div>
            <p className="font-bold text-slate-800 text-base sm:text-lg">120+</p>
            Projects
          </div>

          <div>
            <p className="font-bold text-slate-800 text-base sm:text-lg">50+</p>
            Clients
          </div>

          <div>
            <p className="font-bold text-slate-800 text-base sm:text-lg">5★</p>
            Rating
          </div>

        </div>
      </div>

      {/* Glass Card */}
      <div className="relative p-4 sm:p-8 rounded-3xl sm:rounded-[2.5rem] 
        bg-white/60 backdrop-blur-2xl border border-white/40 
        shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Gradient Border Glow */}
        <div className="absolute inset-0 rounded-3xl sm:rounded-[2.5rem] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.25), rgba(56,189,248,0.25))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1px"
          }}
        ></div>

        {/* Floating Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full"></div>

        <p className="text-slate-600 text-xs sm:text-base leading-relaxed relative z-10">
          Whether you&apos;re in finance, retail, healthcare, or building the next SaaS giant — 
          we help you move faster, scale smarter, and stand out. 
          Our custom solutions are designed to give you a true competitive edge.
        </p>

      </div>

    </div>
  </AnimatedSection>
</div>

          <div className="w-full lg:w-2/5">
           
              <div className=" relative p-[2px] rounded-3xl sm:rounded-[3rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-[0_20px_60px_rgba(236,72,153,0.25)] mt-6 sm:mt-20">
                <div className="rounded-3xl sm:rounded-[3rem] backdrop-blur-xl bg-white/90 p-4 sm:p-10">

                  <div className="relative z-10">
              <ExpertsForm />
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Software;
