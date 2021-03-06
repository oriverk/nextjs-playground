const withPlugins = require('next-compose-plugins')

const withPWA = require('next-pwa')
const optimizedImages = require('next-optimized-images')
const { resolve } = require('path')


const nextConfig = {
  webpack: (config) => {
    // next-optimized-images
    config.resolve.alias['@public/assets'] = resolve(__dirname, 'public/assets')
    return config
  },
}

const nextPwaConfig = {
  pwa: {
    disable: process.env.MODE_ENV === 'development',
    dest: 'public'
  }
}

const nextOptimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  handleImages: ['jpeg', 'png', 'webp'],
  removeOriginalExtension: true,
  optimizeImages: true,
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 85,
  },
  optipng: {
    optimizationLevel: 3,
  },
  responsive: {
    adapter: require('responsive-loader/sharp'),
    sizes: [640, 960, 1200, 1800],
    disable: false
  },
  webp: {
    preset: 'default',
    quality: 85,
  },
}

module.exports = withPlugins(
  [
    [
      withPWA, nextPwaConfig
    ],
    [
      optimizedImages, nextOptimizedImagesConfig
    ],
  ],
  nextConfig
)