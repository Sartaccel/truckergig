const securityHeaders = [{
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
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