import React from 'react';
import FullStackBanner from './FullStackBanner';
import FullStackDev from './FullStackDev';
import FullStackElevate from './FullStackElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const FullStack = () => {
  return (
    <main className="bg-white">
      <FullStackBanner />
      <FullStackDev />
      <FullStackElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default FullStack;
