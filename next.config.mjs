/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

// next.config.js
const configWithPWA = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // only enable in production
});

export default configWithPWA({
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/shipments/create',
        permanent: true,
        locale: false
      }
    ]
  }
});
