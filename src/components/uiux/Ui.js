import React from 'react';
import UiBanner from './UiBanner';
import UiDev from './UiDev';
import UiElevate from './UiElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const Ui = () => {
  return (
    <main className="bg-white">
      <UiBanner />
      <UiDev />
      <UiElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default Ui;
