module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://92.113.32.39:3000/:path*', // Proxy para o backend
      },
    ];
  },
};