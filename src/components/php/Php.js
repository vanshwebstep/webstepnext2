import React from 'react';
import PhpBanner from './PhpBanner';
import PhpDev from './PhpDev';
import PhpElevate from './PhpElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const Php = () => {
  return (
    <main className="bg-white">
      <PhpBanner />
      <PhpDev />
      <PhpElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Php;
