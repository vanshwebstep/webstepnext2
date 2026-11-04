import React from 'react';
import WpBanner from './WpBanner';
import WpDev from './WpDev';
import Elevate from './Elevate';
import WpDetailsSection from './WpDetailsSection';
import Customer from '../Customer';

const Wp = () => {
  return (
    <main className="bg-white">
      <WpBanner />
      <WpDev />
      <Elevate />
      <WpDetailsSection />
      <Customer />
    </main>
  );
};

export default Wp;
