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
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
