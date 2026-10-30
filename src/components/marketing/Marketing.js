import React from 'react';

import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';
import MarketingBanner from './MarketingBanner';
import MarketingDev from './MarketingDev';
import MarketingElevate from './MarketingElevate';

const Marketing = () => {
  return (
    <main className="bg-white">
      <MarketingBanner />
      <MarketingDev />
      <MarketingElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Marketing;
