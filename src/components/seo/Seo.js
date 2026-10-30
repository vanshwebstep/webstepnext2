import React from 'react';

import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';
import SeoBanner from './SeoBanner';
import SeoDev from './SeoDev';
import SeoElevate from './SeoElevate';

const Seo = () => {
  return (
    <main className="bg-white">
      <SeoBanner />
      <SeoDev />
      <SeoElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Seo;
