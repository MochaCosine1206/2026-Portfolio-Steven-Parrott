import React from 'react';

export const getLogo = (id?: string) => {
  switch (id) {
    case 'shaderz': return <ShaderzLogo />;
    case 'plyne': return <PlyneLogo />;
    case 'willowtree': return <WillowTreeLogo />;
    case 'revel': return <RevelLogo />;
    case 'uva': return <UVALogo />;
    case 'ua': return <UALogo />;
    case 'asu': return <ASULogo />;
    case 'unt': return <UNTLogo />;
    default: return null;
  }
};

const ShaderzLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shaderz-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#111" stroke="url(#shaderz-grad)" strokeWidth="2" />
    {/* Stylized 'S' shape representing flow/shaders */}
    <path d="M65 25H35C28 25 25 30 25 38V42C25 50 28 52 35 52H65C72 52 75 58 75 65V68C75 75 70 80 60 80H30" 
          stroke="url(#shaderz-grad)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none" 
    />
    <circle cx="30" cy="80" r="4" fill="#06b6d4" />
    <circle cx="65" cy="25" r="4" fill="#ec4899" />
  </svg>
);

const PlyneLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#4FD1C5" />
    <text x="50" y="72" fontSize="65" fontFamily="Times New Roman, serif" fontWeight="bold" fill="white" textAnchor="middle">P</text>
  </svg>
);

const WillowTreeLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#f3f4f6" />
    <path d="M30 65C30 65 35 30 50 30C65 30 70 65 70 65" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
    <path d="M50 30V75" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
    <path d="M30 50L50 50L70 50" stroke="#10b981" strokeWidth="4"/>
  </svg>
);

const RevelLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
     <rect width="100" height="100" rx="20" fill="#2563eb" />
     <path d="M35 25H55C68 25 75 32 75 45C75 55 68 62 60 62H45V75H35V25Z" fill="white"/>
     <path d="M55 62L70 75" stroke="white" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

const UVALogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="10" fill="#202a44" />
    <path d="M25 30L50 75L75 30" stroke="#ff8200" strokeWidth="12" strokeLinecap="square" strokeLinejoin="miter"/>
    <path d="M25 30L50 75L75 30" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
  </svg>
);

const UALogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10L10 90H30L40 70H60L70 90H90L50 10Z" fill="#CC0033"/>
    <path d="M40 70L50 45L60 70H40Z" fill="#003366"/>
  </svg>
);

const ASULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#8C1D40" rx="10"/>
    <text x="50" y="65" fontSize="40" fontWeight="bold" fill="#FFC627" textAnchor="middle" fontFamily="serif">ASU</text>
  </svg>
);

const UNTLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#00853E" />
    <text x="50" y="65" fontSize="35" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="sans-serif" letterSpacing="-2">UNT</text>
  </svg>
);
