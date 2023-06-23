/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.evotel.co.za', 'www.mweb.co.za'],
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
