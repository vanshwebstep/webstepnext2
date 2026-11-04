import React from 'react';
import LaravelBanner from './LaravelBanner';
import LaravelDev from './LaravelDev';
import LaravelElevate from './LaravelElevate';
import LaravelDetailsSection from './LaravelDetailsSection';
import Customer from '../Customer';

const Laravel = () => {
  return (
    <main className="bg-white">
      <LaravelBanner />
      <LaravelDev />
      <LaravelElevate />
      <LaravelDetailsSection />
      <Customer />
    </main>
  );
};

export default Laravel;
