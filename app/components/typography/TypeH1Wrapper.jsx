// Typeh2ClientWrapper.jsx
'use client';
import dynamic from 'next/dynamic';

const TypeH1 = dynamic(() => import('../typography/TypeH1'), { ssr: false });

export default TypeH1;