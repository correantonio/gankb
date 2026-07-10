'use client';
import dynamic from 'next/dynamic';

const StepsWrapper = dynamic(() => import('./Steps'), {
  ssr: false,
});

export default function Steps() {
  return <StepsWrapper />;
}