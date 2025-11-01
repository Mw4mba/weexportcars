import React from 'react';

export const COLORS = {
  light: '#e6e6e6',
  dark: '#2a3443',
  accent: '#d10e22',
};

export const NAV_LINKS = ['Home', 'About', 'Services', 'Process', 'Showroom', 'Contact'];

export const LOGO_URL = '/logo-dark.png';

export const CAROUSEL_SLIDES = [
  {
    textTitle: 'The Best of SA Exports',
    textSubtitle: 'Experience seamless vehicle exportation from South Africa with our trusted team of professionals.',
    image: '/hero-car-1.jpg',
  },
  {
    textTitle: 'Global Reach & Expertise',
    textSubtitle: 'Partnering with reliable logistics networks to deliver excellence across continents.',
    image: '/hero-car-2.jpg',
  },
  {
    textTitle: 'VAT FREE Shipping',
    textSubtitle: 'Get maximum value on your export with our VAT-free shipping solutions.',
    image: '/hero-car-3.jpg',
  },
];

export const FEATURED_CARS = [
    { model: 'Mercedes-Benz S-Class', year: 2023, price: 'P.O.A', img: '/vehicles/mercedes-amg.jpg' },
    { model: 'Range Rover Velar', year: 2024, price: 'P.O.A', img: '/vehicles/range-rover.jpg' },
    { model: 'Porsche 911', year: 2022, price: 'P.O.A', img: '/vehicles/porsche.jpg' },
    { model: 'BMW X7', year: 2023, price: 'P.O.A', img: '/vehicles/bmw-x7.jpg' },
];

export const PROCESS_STEPS = [
    { id: 'step-1', title: "1. Selecting Your Vehicle", detail: "Choose your preferred vehicle from www.cars.co.za or www.autotrader.co.za and forward the link to us via WhatsApp or email." },
    { id: 'step-2', title: "2. Due Diligence", detail: "We conduct thorough due diligence on both the vehicle and the seller. The vehicle's VIN number is processed through First Check to verify no accidents or theft reports." },
    { id: 'step-3', title: "3. Invoicing", detail: "You receive a detailed invoice outlining all charges including vehicle inspection, police clearance, export permit, customs documentation, freight, and logistics services." },
    { id: 'step-4', title: "4. Payment & Vehicle Collection", detail: "Upon confirmation of funds received, payment is remitted to the dealership, and arrangements are made to collect the vehicle." },
    { id: 'step-5', title: "5. Police Clearance", detail: "The vehicle is presented to the South African Police Service for clearance. A certificate is issued confirming the vehicle has not been reported as stolen." },
    { id: 'step-6', title: "6. Roadworthy Inspection", detail: "In certain countries, imported vehicles must be certified as roadworthy. We handle the inspection process through Dekra on your behalf." },
    { id: 'step-7', title: "7. Export Permit", detail: "We handle the application for your vehicle's export permit through the International Trade Administration Commission of South Africa." },
    { id: 'step-8', title: "8. Customs Documents", detail: "Final documents necessary for export are prepared and presented to the designated shipping line, airline, or border authorities." },
    { id: 'step-9', title: "9. Delivery", detail: "We provide multiple delivery options including air, road, and sea transport. Our team offers expert recommendations tailored to your destination country." },
    { id: 'step-10', title: "10. Receiving Your Vehicle", detail: "The vehicle is handled by your designated clearing agent, who will inspect and receive the vehicle on your behalf." },
];
