import React from 'react';
import dynamic from 'next/dynamic';
import AnimatedSection from '../AnimatedSection';
import Banner from '../Banner';

const ConverstionService = dynamic(() => import('../ConverstionService'));
const Services = dynamic(() => import('../Services'));
const OurExpertize = dynamic(() => import('../OurExpertize'));
const TrustReviewsPage = dynamic(() => import('../TrustReviewsPage'));
const Process = dynamic(() => import('../Process'));
const Customer = dynamic(() => import('../Customer'));
const Experience = dynamic(() => import('../Experience'));
const MarketingTeam = dynamic(() => import('../MarketingTeam'));
const FormSection = dynamic(() => import('../FormSection'));

const Home = () => {
  return (
    <main className="relative bg-white text-slate-900 min-h-screen overflow-hidden font-roboto">
      {/* Site-wide Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] bg-[#FF1F8E]/5 rounded-full blur-[250px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[#D400CC]/5 rounded-full blur-[250px]" />
      </div>

      <div className="relative z-10">
        <AnimatedSection delay={0} direction="down">
          <Banner />
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="left">
          <ConverstionService />
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="right">
          <Services />
        </AnimatedSection>



        <AnimatedSection delay={0.2} direction="left">
          <Process />
        </AnimatedSection>

        {/* <AnimatedSection delay={0.2} direction="right">
          <ServicesPage />
        </AnimatedSection> */}
        {/* 
        <AnimatedSection delay={0.2} direction="up">
          <Design />
        </AnimatedSection> */}

        <AnimatedSection delay={0.2} direction="left">
          <Customer />
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="right">
          <Experience />
        </AnimatedSection>
        <AnimatedSection delay={0.2} direction="up">
          <OurExpertize />
        </AnimatedSection>
         {/* <AnimatedSection delay={0.2} direction="up">
          <TrustReviewsPage />
        </AnimatedSection> */}
        {/* <AnimatedSection delay={0.2} direction="up">
          <MarketingTeam />
        </AnimatedSection> */}
 
 
        <AnimatedSection delay={0.2} direction="up">
          <FormSection />
        </AnimatedSection>

        {/* <AnimatedSection delay={0.2} direction="up">
          <HomePage />
        </AnimatedSection> */}
      </div>
    </main>
  );
};

export default Home;
