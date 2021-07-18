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
    `gatsby-plugin-preload-fonts`,
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
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/favicons/asalato.svg',
        name: 'Asalato Resolver',
        short_name: 'Asalato Resolver',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        legacy: true,
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
