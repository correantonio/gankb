// components/ScrubbingMarqueeWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

const ScrubbingMarquee = dynamic(() => import('./ScrubbingMarquee'), { 
  ssr: false 
});

export default ScrubbingMarquee;