const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
    webpack5: false,
  },
];

module.exports = {
  reactStrictMode: true, 
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'truckergigpro.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'truckergigqa.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Ignores ESLint errors during builds (not recommended for prod)
    ignoreDuringBuilds: true,
  },
};
