const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'asalato-site',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        themes: path.join(__dirname, 'src/themes'),
        components: path.join(__dirname, 'src/components'),
        interfaces: path.join(__dirname, 'src/interfaces'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'asalato-site',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'src/favicons/asalato.svg',
        icons: [
          {
            src: 'src/favicons/maskable_icon_48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'src/favicons/maskable_icon_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        name: `Asalato Resolver`,
        short_name: `Asalato Resolver`,
        legacy: true,
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
