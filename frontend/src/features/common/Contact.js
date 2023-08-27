// src/ContactUs.js
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Link to="/" className='flex gap-1 mb-3 '>
        <ArrowLeftIcon color='red' className='w-5'/> back
      </Link>
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700">
          Have a question or feedback? We'd love to hear from you! Feel free
          to get in touch using the details below or visit us in person.
        </p>

        {/* Map */}
        <div className="mt-6">
          <MapContainer center={[24.542241, 81.379507]} zoom={14} style={{ height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[24.542241, 81.379507]} />
          </MapContainer>
        </div>

        {/* Contact Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-gray-700">123 Main Street</p>
          <p className="text-gray-700">City, Country</p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">Email: ApnaCart@example.com</p>
          <p className="text-gray-700">Phone: +1234567890</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
