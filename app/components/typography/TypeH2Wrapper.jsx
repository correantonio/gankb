// Typeh2ClientWrapper.jsx
'use client';
import dynamic from 'next/dynamic';

const TypeH2 = dynamic(() => import('../typography/TypeH2'), { ssr: false });

export default TypeH2;