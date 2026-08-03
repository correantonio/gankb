// components/animated/DifferentialStackWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const DifferentialStack = dynamic(() => import('../animated/DifferentialStack'), {
  ssr: false,
  loading: () => <div className="w-full pb-[100vh] bg-transparent" />
});

export default DifferentialStack;