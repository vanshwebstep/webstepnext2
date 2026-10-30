import React from 'react';
import TestBanner from './TestBanner';
import TestDev from './TestDev';
import TestElevate from './TestElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const Testing = () => {
  return (
    <main className="bg-white">
      <TestBanner />
      <TestDev />
      <TestElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Testing;
