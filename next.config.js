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
}