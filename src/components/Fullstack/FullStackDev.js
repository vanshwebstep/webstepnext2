import React from 'react';
import ExpertsForm from '../ExpertsForm';
import AnimatedSection from '../AnimatedSection';

const FullStackDev = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative z-10 px-6 overflow-hidden font-roboto">

      {/* Decorative background glows — matches Blogs page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">

            {/* ── RIGHT CONTENT ── */}
            <div className="lg:w-3/5">
              <div className="mb-10">

                {/* Glass badge — same as Blogs */}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl
                  bg-white/50 backdrop-blur-xl border border-white/60
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)] mb-6
                  hover:scale-105 transition-all duration-300 cursor-default">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF1F8E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF1F8E]" />
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-[0.35em] uppercase"
                    style={{
                      background: "linear-gradient(135deg, #FF1F8E 0%, #A855F7 50%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Scalable Solutions
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[0.95] text-slate-900 mb-4 tracking-tight">
                  What is Included in{" "}
                  <span
                    className="relative inline-block"
                    style={{
                      background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Custom Web Development
                    {/* Animated underline glow — matches Blogs */}
                    <span className="absolute left-0 -bottom-2 w-full h-[5px] rounded-full
                      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
                      blur-sm opacity-70 animate-pulse" />
                  </span>
                </h2>

                {/* Divider — matches Blogs */}
                <div className="relative w-20 h-1.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-8">
                  <div className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-pink-400 to-cyan-400" />
                </div>

                {/* Body text */}
                <div className="space-y-5 text-slate-500 text-lg leading-relaxed">
                  <p>
                    Our full-stack development team brings together the best of both worlds — stunning
                    frontend experiences and robust, high-performance backends. We specialize in building
                    applications that are not only visually appealing but also highly functional and secure.
                  </p>
                  <p>
                    Whether you&apos;re looking for a React-based frontend with a Node.js backend or a more
                    traditional PHP stack, our experts have the skills to deliver a seamless digital product.
                  </p>
                  <p>
                    From ideation and UI/UX design to database architecture and cloud deployment, we handle
                    the entire development lifecycle so you can focus on{" "}
                    <span className="text-slate-900 font-semibold">growing your business.</span>
                  </p>
                </div>

              </div>
            </div>

            {/* ── LEFT FORM ── */}
            <div className="lg:w-2/5 w-full">
              {/* Gradient border wrapper — matches Blogs QuoteForm */}
              <div
                className="relative p-[2px] rounded-[3rem]"
                style={{
                  background: "linear-gradient(135deg, #FF1F8E, #A855F7, #38BDF8)",
                  boxShadow: "0 20px 60px rgba(236,72,153,0.25)",
                }}
              >
                <div className="rounded-[3rem] backdrop-blur-xl bg-white/90 p-8 md:p-10">
                  <ExpertsForm />
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FullStackDev;