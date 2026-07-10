'use client';
import dynamic from 'next/dynamic';

const DiagnosticsWrapper = dynamic(() => import('./Diagnostics'), { 
  ssr: false 
});

export default function Diagnostics() {
  return <DiagnosticsWrapper />;
}