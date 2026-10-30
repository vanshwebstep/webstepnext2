import React from 'react';
import WpBanner from './WpBanner';
import WpDev from './WpDev';
import Elevate from './Elevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const Wp = () => {
  return (
    <main className="bg-white">
      <WpBanner />
      <WpDev />
      <Elevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Wp;
