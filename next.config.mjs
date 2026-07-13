/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Adicione isso se você usou next/image no projeto
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
