/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'imagesprojects.s3.ap-south-1.amazonaws.com',
        }
    ],
  },
  eslint: {ignoreDuringBuilds: true},
};

export default nextConfig;
