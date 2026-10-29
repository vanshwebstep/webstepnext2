"use client";
import React from 'react';
import AnimatedSection from '../AnimatedSection';

const AboutStats = () => {
  const stats = [
    { num: "500+", label: "Projects Completed" },
    { num: "98%", label: "Client Satisfaction" },
    { num: "50+", label: "Expert Engineers" },
    { num: "12+", label: "Years Experience" }
  ];

  return (
    <section className="py-20 bg-slate-900 px-6 font-roboto">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={0.1 * index} direction="up" className="text-center">
              <span className="block text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
                {stat.num}
              </span>
              <span className="text-[10px] font-bold tracking-widest capitalize text-slate-400">
                {stat.label}
              </span>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
