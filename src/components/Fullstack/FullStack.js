import React from 'react';
import FullStackBanner from './FullStackBanner';
import FullStackDev from './FullStackDev';
import FullStackElevate from './FullStackElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const FullStack = ({ isFullstack = false }) => {
  return (
    <main className="bg-white">
      <FullStackBanner isFullstack={isFullstack} />
      <FullStackDev />
      <FullStackElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default FullStack;
