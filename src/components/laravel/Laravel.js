import React from 'react';
import LaravelBanner from './LaravelBanner';
import LaravelDev from './LaravelDev';
import LaravelElevate from './LaravelElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const Laravel = () => {
  return (
    <main className="bg-white">
      <LaravelBanner />
      <LaravelDev />
      <LaravelElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Laravel;
