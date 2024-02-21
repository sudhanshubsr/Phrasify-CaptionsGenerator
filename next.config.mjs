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
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      issuer: {
        and: [/\.(js|ts|md)x?$/],
      },
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
