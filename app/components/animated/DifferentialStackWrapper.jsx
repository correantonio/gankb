// components/animated/DifferentialStackWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const DifferentialStack = dynamic(() => import('../animated/DifferentialStack'), {
  ssr: false,
});

export default DifferentialStack;