import React from 'react';
import NodeBanner from './NodeBanner';
import NodeDev from './NodeDev';
import NodeElevate from './NodeElevate';
import BlogReview from '../Blog/BlogReview';
import Customer from '../Customer';

const NodeJs = () => {
  return (
    <main className="bg-white">
      <NodeBanner />
      <NodeDev />
      <NodeElevate />
      {/* <BlogReview /> */}
      <Customer />
    </main>
  );
};

export default NodeJs;
