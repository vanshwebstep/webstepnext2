import React from 'react';
import MobileBanner from './MobileBanner';
import MobileDev from './MobileDev';
import MobileElevate from './MobileElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const MobileApp = () => {
  return (
    <main className="bg-white">
      <MobileBanner />
      <MobileDev />
      <MobileElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default MobileApp;
