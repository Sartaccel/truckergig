const securityHeaders = [{
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
    webpack5: false,
  }];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    domains: ['truckergigpro.s3.us-east-2.amazonaws.com'], // ✅ allow S3 images
  },
  eslint: {
    // ✅ Ignores ESLint errors during builds (not recommended for prod)
    ignoreDuringBuilds: true,
  },
}