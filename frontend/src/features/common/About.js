// src/App.js
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Link to="/" className='flex gap-1 mb-3 '>
        <ArrowLeftIcon color='red' className='w-5'/> back
      </Link>
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>
        <p className="text-gray-700">
          Welcome to our e-commerce store! We're passionate about bringing you
          the best products and providing an exceptional shopping experience.
          Our mission is to deliver quality items that you'll love.
        </p>
        <p className="mt-4 text-gray-700">
          With a wide range of categories and products, we aim to cater to
          all your needs. Our dedicated team is here to assist you and ensure
          your satisfaction.
        </p>
        <p className="mt-4 text-gray-700">
          Thank you for choosing us. Happy shopping!
        </p>
      </div>
    </div>
  );
}

export default About;
